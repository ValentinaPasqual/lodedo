#from __future__ import print_function
from flask import Flask
from flask import Blueprint, render_template, send_from_directory, request,  url_for, redirect, session, Response, jsonify

from rdflib import Graph
from rdflib.plugins.sparql import prepareQuery

from graphdb.rdf4j.api.repositories_api import RepositoriesApi
from graphdb.rdf4j.api.sparql_api import SparqlApi
from graphdb.rdf4j.configuration import Configuration
from graphdb.rdf4j.api_client import ApiClient
from graphdb.mime_types import RDFTypes

app = Flask(__name__, static_folder="assets")


conf = Configuration()
conf.host = "http://localhost:7200/"
api_client = ApiClient(configuration=conf)
api_client.set_default_header("Content-Type", "application/x-www-form-urlencoded")  # Set the content type
repository = "edo4"
api = RepositoriesApi(api_client)
sparql_api = SparqlApi(api_client)

prefixes = """prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl>
prefix icon: <https://w3id.org/icon/ontology/>
prefix lodedo: <https://w3id.org/lodedo/data/>
prefix sim: <https://w3id.org/simulation/ontology/>"""

def interpretations_data_builder(scholar_ints_result, part_query_string):
    result = {}
    for g in scholar_ints_result['results']['bindings']:
        scholar_int_query = prefixes + """SELECT DISTINCT * WHERE { <""" + g['interpretation']['value'] + "> " + part_query_string
        scholar_int_triples = sparql_api.execute_get_select_query(repository, query=scholar_int_query)

        temp = {}
        for row in scholar_int_triples['results']['bindings']:
            for k,v in row.items():
                temp.update({k:v['value']})

        if len(temp) > 0:
            result.update({g['interpretation']['value']:temp})

    return result

@app.route('/artworks/<artworkID>')
def card(artworkID):
    # TO DO
    artwork_factual_result = {}
    artwork_factual_query = prefixes + "SELECT ?image WHERE { lodedo:"+ artworkID +" icon:image ?image. } "
    artwork_factual_result = sparql_api.execute_get_select_query(repository, query=artwork_factual_query)

    artwork_image = artwork_factual_result['results']['bindings'][0]['image']['value']
    #artwork_image = ''

    scholar_ints_query = prefixes + """SELECT DISTINCT ?interpretation ?author WHERE {?interpretation icon:aboutWorkOfArt lodedo:""" + artworkID + """; dul:includesAgent ?author.}"""
    scholar_ints_result = sparql_api.execute_get_select_query(repository, query=scholar_ints_query)

    authors_list = []
    for el in scholar_ints_result['results']['bindings']:
        authors_list.append(el['author']['value'])

    authors_list = list(set(authors_list))

    scholars_ints = {}
    for author in authors_list:
        single_scholar_interpretations = {}
        # PREICONOGRAPHICAL INTERPRETATIONS
        ints_part_query_string = """icon:recognizedArtisticMotif ?recog. ?recog icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel. ?meaning a ?class. ?class rdfs:label ?classLabel. OPTIONAL {?recog dul:hasQuality ?quality. ?quality rdfs:label ?qualityLabel} OPTIONAL {?recog icon:isPartOf ?composition} } """
        single_scholar_interpretations.update({'preiconographic':interpretations_data_builder(scholar_ints_result, ints_part_query_string)})

        # COMPOSITIONS RECOGNITIONS
        # comps_part_query_string = """icon:recognizedComposition ?composition. ?composition icon:hasPart ?recog. ?recog icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel. ?meaning a ?class. ?class rdfs:label ?classLabel. }"""
        # single_scholar_interpretations.update({'composition': interpretations_data_builder(scholar_ints_result, comps_part_query_string)})

        # ICONOGRAPHICAL INTERPRETATIONS
        icon_part_query_string = """icon:recognizedImage ?recog. ?recog ?pred ?meaning . ?meaning a ?class. ?meaning rdfs:label ?meaningLabel. ?class rdfs:label ?classLabel } """
        single_scholar_interpretations.update({'iconographical': interpretations_data_builder(scholar_ints_result, icon_part_query_string)})

        # SYMBOLS RECOGNITIONS
        icon_part_query_string = """icon:recognizedImage ?recog. ?recog icon:hasSymbol ?meaning . ?meaning sim:hasContext ?context . ?context rdfs:label ?contextLabel. ?meaning sim:preventedRealityCounterpart ?realityCounterpart . ?realityCounterpart rdfs:label ?realityCounterpartLabel. ?meaning sim:hasSimulacrum ?simulacrum . OPTIONAL{?simulacrum rdfs:label ?simulacrumLabel}} """
        single_scholar_interpretations.update({'symbol': interpretations_data_builder(scholar_ints_result, icon_part_query_string)})

        # CONTEXTUAL INFORMATION TO BE DONE
        scholars_ints.update({author:single_scholar_interpretations})

    # TO DO
    artwork_conj_result = {}
    #artwork_conj_query = """prefix icon:<http://www.example.org/> SELECT ?p ?o WHERE { conj ?g {icon:""" + artworkID + """?p ?o}}"""
    #artwork_conj_result = sparql_api.execute_get_select_query(repository, query=artwork_conj_query)

    return render_template('artworks.html', artworkID=artworkID, artwork_image=artwork_image, artwork_factual_result=artwork_factual_result, scholars_ints=scholars_ints, artwork_conj_result=artwork_conj_result)

@app.route("/", methods=["GET", "POST"])
def index():

    # SELECT ALL ARTWORKS QUERY
    sparql_query = prefixes + """
        SELECT ?item ?image
        WHERE {
            ?item icon:image ?image.
            ?interpretation icon:aboutWorkOfArt ?item.
            }
    """
    results = sparql_api.execute_get_select_query(repository, query=sparql_query)

    result_cards = []
    unique_items = set()
    for row in results['results']['bindings']:
        item = row['item']['value']
        image = row['image']['value']
        if item not in unique_items:
            unique_items.add(item)
            result_cards.append({"item": item, "image": image})

    # Define the facets and their values
    facets = {
        "icon:recognizedArtisticMotif": dict() ,
        "icon:recognizedImage": dict(),
        "sim:preventedRealityCounterpart":dict(),
        "sim:hasSimulacrum":dict(),
        "sim:hasContext":dict(),
        "dul:includesAgent":dict(),
    }

    # Collect facet values from the RDF data
    for facet, values in facets.items():

        if 'icon:recognizedArtisticMotif' in facet or 'icon:recognizedImage' in facet:
            if 'icon:recognizedImage' in facet:
                query = prefixes + """ SELECT DISTINCT * WHERE { ?subj """ + facet + """ ?image . ?image ?pred ?obj. ?obj a ?class; rdfs:label ?label. ?class rdfs:label ?classLabel }"""

            if 'icon:recognizedArtisticMotif' in facet:
                query = prefixes + """ SELECT DISTINCT * WHERE { ?subj """ + facet + """ ?motif . ?motif icon:hasFactualMeaning ?obj. ?obj a ?class; rdfs:label ?label. ?class rdfs:label ?classLabel }"""

            results = sparql_api.execute_get_select_query(repository, query=query)

            temp = {}
            for row in results['results']['bindings']:
                res= {}
                res.update({'class':row['class']['value']})
                res.update({'classLabel':row['classLabel']['value']})
                res.update({'label':row['label']['value']})
                temp.update({row['obj']['value']:res})

            sorted_dict = dict(sorted(temp.items(), key=lambda item: item[1]['label']))
            values.update(sorted_dict)

        if 'sim:hasContext' in facet or 'sim:preventedRealityCounterpart' in facet or 'sim:hasSimulacrum' in facet or 'dul:includesAgent' in facet:
            query = prefixes + """ SELECT DISTINCT * WHERE { ?subj """ + facet + """ ?obj . ?obj rdfs:label ?label. }"""

            results = sparql_api.execute_get_select_query(repository, query=query)

            temp = {}
            for row in results['results']['bindings']:
                res= {}
                res.update({'label':row['label']['value']})
                temp.update({row['obj']['value']:res})

            sorted_dict = dict(sorted(temp.items(), key=lambda item: item[1]['label']))
            values.update(sorted_dict)

    # Handle form submission
    if request.method == "POST":
        if "clearAllBtn" in request.form:
            # Clear all selected facets
            selected_facets = {}
        else:
            selected_facets = {
                facet: request.form.getlist(facet) for facet in facets.keys()
            }

            # Build and execute the SPARQL query
            sparql_query = prefixes + """
                SELECT ?item ?image
                WHERE {
                    ?item icon:image ?image.
                    ?interpretation icon:aboutWorkOfArt ?item.
            """

            filter_clauses = []

            for facet, values in selected_facets.items():
                if values:
                    filter_clause = ''
                    if facet == "icon:recognizedArtisticMotif":
                        filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif. ?motif icon:hasFactualMeaning ?recognizedArtisticMotif ."
                    if facet == "icon:recognizedImage":
                        filter_clause += "?interpretation icon:recognizedImage ?img. ?img ?pred ?recognizedImage ."
                    if "sim:hasContext" in facet or "sim:preventedRealityCounterpart" in facet or "sim:hasSimulacrum" in facet:
                        filter_clause += '?interpretation icon:recognizedImage ?recognizedImage. ?recognizedImage icon:hasSymbol ?symbol .'
                        if facet == "sim:hasContext":
                            filter_clause += "?symbol sim:hasContext ?hasContext . "
                        if facet == "sim:preventedRealityCounterpart":
                            filter_clause += "?symbol sim:preventedRealityCounterpart ?preventedRealityCounterpart . "
                        if facet == "sim:hasSimulacrum":
                            filter_clause += "?symbol sim:hasSimulacrum ?hasSimulacrum . "

                    # TO ADD AT THE BEGINNING
                    if facet == "dul:includesAgent":
                        filter_clause += "?interpretation dul:includesAgent ?includesAgent."

                    # adds selected filters
                    filters_list = ', '.join(['<' + value + '>' for value in values])
                    filter_clause += f"FILTER (?{facet.replace('icon:', '').replace('dul:', '').replace(' ', '').replace('sim:', '')} IN ({filters_list}))."
                    filter_clauses.append(filter_clause)

            if filter_clauses:
                sparql_query += ' '.join(filter_clauses)

            sparql_query += "}"

            print(sparql_query)

            results = sparql_api.execute_get_select_query(repository, query=sparql_query)

            result_cards = []

            unique_items = set()
            for row in results['results']['bindings']:
                item = row['item']['value']
                image = row['image']['value']
                if item not in unique_items:
                    unique_items.add(item)
                    result_cards.append({"item": item, "image": image})

        return render_template("index.html", facets=facets, selected_facets=selected_facets, result_cards=result_cards)

    return render_template("index.html", facets=facets, selected_facets={}, result_cards=result_cards)

if __name__ == "__main__":
    app.run(debug = True, port = 8000)
