#from __future__ import print_function
from flask import Flask
from flask import Blueprint, render_template, send_from_directory, request,  url_for, redirect, session, Response, jsonify
import urllib

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
repository = "LODEdo_endpoint"
api = RepositoriesApi(api_client)
sparql_api = SparqlApi(api_client)

prefixes = """
prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#>
prefix icon: <https://w3id.org/icon/ontology/>
prefix lodedo: <https://w3id.org/lodedo/data/>
prefix sim: <https://w3id.org/simulation/ontology/>
"""

@app.route('/artworks/<artworkID>')
def artwork(artworkID):

    # TO DO
    #artwork_factual_result = {}
    #artwork_factual_query = prefixes + "SELECT ?image WHERE { lodedo:"+ artworkID +" icon:image ?image. } "
    #artwork_factual_result = sparql_api.execute_get_select_query(repository, query=artwork_factual_query)
    #artwork_image = artwork_factual_result['results']['bindings'][0]['image']['value']
    #artwork_image = ''

    # SCHOLARS INTERPRETATIONS
    scholar_ints_query = prefixes + """SELECT ?g ?authorLabel WHERE {graph ?g {?interpretation icon:aboutWorkOfArt lodedo:""" + artworkID + """; dul:includesAgent ?author.} ?author rdfs:label ?authorLabel}"""
    scholar_ints_result = sparql_api.execute_get_select_query(repository, query=scholar_ints_query)

    scholars_ints = {}
    for el in scholar_ints_result['results']['bindings']:
        scholars_ints.update({el['g']['value']: el['authorLabel']['value']})

    # preiconographical interpretations
    preico_interpretations = []
    preico_query = prefixes + """SELECT ?motifHR ?motifLabel WHERE {graph ?g {?interpretation icon:aboutWorkOfArt lodedo:""" + artworkID + """; icon:recognizedArtisticMotif ?int} ?int icon:hasFactualMeaning ?motif. ?motif rdfs:label ?motifLabel. OPTIONAL{?motif owl:sameAs ?motifHR}}"""
    preico_result = sparql_api.execute_get_select_query(repository, query=preico_query)

    for row in preico_result['results']['bindings']:
        if 'motifHR' in row:
            preico_interpretations.append((row['motifLabel']['value'], row['motifHR']['value']))
        else:
            preico_interpretations.append((row['motifLabel']['value'], None))

    preico_interpretations = list(set(preico_interpretations))

    # AUTHOMATIC INTERPRETATIONS
    artwork_conj_result = {}
    artwork_conj_query = prefixes + """SELECT * WHERE {conj ?g {?interpretation icon:aboutWorkOfArt lodedo:""" + artworkID + """; icon:recognizedImage ?reconImage. ?reconImage icon:hasSymbol ?symbol.} ?symbol sim:hasContext ?context; sim:hasSimulacrum ?simulacrum. ?context rdfs:label ?contextLabel}"""
    artwork_conj_result = sparql_api.execute_get_select_query(repository, query=artwork_conj_query)

    auto_ints = {}
    i=1
    for row in artwork_conj_result['results']['bindings']:
        if row['g']['value'] not in auto_ints:
            i = 1
            symb_list = [row['simulacrum']['value']]
            auto_ints.update({row['g']['value']:[row['contextLabel']['value'], i, symb_list]})
        else:
            i+=1
            symb_list.append(row['simulacrum']['value'])
            auto_ints.update({row['g']['value']:[row['contextLabel']['value'], i, symb_list]})



    return render_template('artworks.html', artworkID=artworkID, auto_ints=auto_ints, scholars_ints=scholars_ints, preico_interpretations=preico_interpretations, artwork_conj_result=artwork_conj_result)

@app.route('/conjectures/<conjID>')
def conj(conjID):

    # gets the set of automatic interpretations
    artwork_conj_result, auto_int_res = {}, {}
    artwork_conj_query = prefixes + "SELECT * WHERE {conj ?g {?interpretation icon:aboutWorkOfArt ?art} FILTER regex(str(?g),\"" + conjID + "\")}"
    artwork_conj_result = sparql_api.execute_get_select_query(repository, query=artwork_conj_query)

    # gets the image recognition data
    for row in artwork_conj_result['results']['bindings']:
        conj_triples_result = {}
        conj_triples_query = prefixes + "SELECT ?meaningLabel ?meaningClassLabel ?symbol ?qualityLabel WHERE {CONJ ?g {<" + row['interpretation']['value'] + "> icon:recognizedImage ?reconImage; icon:refersToArtisticMotif ?motif} ?reconImage icon:hasSymbol ?symbol. ?motif icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel; a ?meaningClass. ?meaningClass rdfs:label ?meaningClassLabel. OPTIONAL {?motif dul:hasQuality ?quality. ?quality rdfs:label ?qualityLabel} FILTER regex(str(?g),\"" + conjID + "\")}"
        conj_triples_result = sparql_api.execute_get_select_query(repository, query=conj_triples_query)
        auto_int_res.update({row['interpretation']['value']:conj_triples_result['results']['bindings']})

        # for each interpretation gets the symbol
        for row2 in conj_triples_result['results']['bindings']:
            if 'symbol' in row2:
                symbol_query = prefixes + "SELECT DISTINCT ?symbolLabel ?symbolClass ?simulacrumLabel ?realityCounterpartLabel ?symbolClass WHERE {<" + row2['symbol']['value'] + "> sim:hasContext ?context; rdfs:label ?symbolLabel; a ?symbolClass; sim:hasRealityCounterpart ?realityCounterpart; sim:hasSimulacrum ?simulacrum. ?realityCounterpart rdfs:label ?realityCounterpartLabel. OPTIONAL {?simulacrum rdfs:label ?simulacrumLabel}. OPTIONAL {?simulacrum owl:sameAs ?simulacrumHR. ?simulacrumHR rdfs:label ?simulacrumLabel} FILTER (?symbolClass != icon:Symbol)}"
                symbol_result = sparql_api.execute_get_select_query(repository, query=symbol_query)
                try:
                    auto_int_res[row['interpretation']['value']][0].update(symbol_result['results']['bindings'][0])
                except:
                    None

    return render_template('conjectures.html', conjID=conjID, artwork_conj_result=artwork_conj_result, auto_int_res=auto_int_res)

@app.route('/scholarlyInterpretations/<graphID>')
def graph(graphID):

    def interpretations_data_builder(graphID, part_query_string):
        result, scholar_int_triples = {}, {}
        scholar_int_query = prefixes + "SELECT DISTINCT * WHERE {graph lodedo:" + graphID+ " {" + part_query_string
        scholar_int_triples = sparql_api.execute_get_select_query(repository, query=scholar_int_query)

        for row in scholar_int_triples['results']['bindings']:
            temp = {}
            for k,v in row.items():
                temp.update({k:v['value']})
                result.update({row['interpretation']['value']:temp})

        return result

    int_metadata_query = prefixes + "SELECT DISTINCT ?artwork ?agentLabel WHERE {graph lodedo:" + graphID+ " {?interpretation icon:aboutWorkOfArt ?artwork; dul:includesAgent ?agent.} ?agent rdfs:label ?agentLabel}"
    int_metadata_result = sparql_api.execute_get_select_query(repository, query=int_metadata_query)

    scholar_ints, symbol_ints = {}, {}
    # get all symbols
    query = "SELECT ?symbol ?simulacrum ?realityCounterpart ?context ?g WHERE {conj ?g {?symbol a sim:Symbol.}}"

    # PREICONOGRAPHICAL INTERPRETATIONS
    ints_part_query_string = """?interpretation icon:recognizedArtisticMotif ?recog.} ?recog icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel. ?meaning a ?class. ?class rdfs:label ?classLabel. OPTIONAL {?recog dul:hasQuality ?quality. ?quality rdfs:label ?qualityLabel} OPTIONAL {?recog icon:isPartOf ?composition} } """
    scholar_ints.update({'preiconographic': interpretations_data_builder(graphID, ints_part_query_string)})

    #COMPOSITIONS RECOGNITIONS
    comps_part_query_string = """?interpretation icon:recognizedComposition ?composition. } ?composition icon:hasPart ?recog. ?recog icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel. ?meaning a ?class. ?class rdfs:label ?classLabel. }"""
    scholar_ints.update({'composition': interpretations_data_builder(graphID, comps_part_query_string)})

    #ICONOGRAPHICAL INTERPRETATIONS
    icon_part_query_string = """?interpretation icon:recognizedImage ?recog. ?recog ?pred ?meaning . } ?meaning a ?class. ?meaning rdfs:label ?meaningLabel. ?class rdfs:label ?classLabel } """
    scholar_ints.update({'iconographical':interpretations_data_builder(graphID, icon_part_query_string)})

    # SYMBOLS RECOGNITIONS
    symbol_part_query_string = """?interpretation icon:recognizedImage ?recog. ?recog icon:hasSymbol ?meaning .} ?meaning sim:hasContext ?context . ?meaning sim:hasRealityCounterpart ?realityCounterpart . ?realityCounterpart rdfs:label ?realityCounterpartLabel. ?meaning sim:hasSimulacrum ?simulacrum . ?context rdfs:label ?contextLabel. ?simulacrum rdfs:label ?simulacrumLabel}"""
    symbol_ints = interpretations_data_builder(graphID, symbol_part_query_string)

    return render_template('graphs.html', int_metadata_result=int_metadata_result, graphID=graphID, scholar_ints=scholar_ints, symbol_ints=symbol_ints)

def start():
    # SELECT ALL ARTWORKS QUERY
    sparql_query = prefixes + """
        SELECT ?item ?image
        WHERE {
            optional {?item icon:image ?image.}
            ?interpretation icon:aboutWorkOfArt ?item.
            }
    """
    results = sparql_api.execute_get_select_query(repository, query=sparql_query)

    result_cards = []
    unique_items = set()
    for row in results['results']['bindings']:
        item = row['item']['value']
        #image = row['image']['value']
        if item not in unique_items:
            unique_items.add(item)
            #result_cards.append({"item": item, "image": image})
            result_cards.append({"item": item})

    return result_cards

@app.route("/", methods=["GET", "POST"])
def index():

    # launchs the catalogue
    result_cards = start()

    # Define the facets and their values
    facets = {
        "icon:recognizedArtisticMotif": dict() ,
        "icon:recognizedComposition": dict() ,
        "icon:recognizedImage": dict(),
        "sim:hasRealityCounterpart":dict(),
        "sim:hasContext":dict(),
        "dul:includesAgent":dict(),
    }

    # Collect facet values from the RDF data
    for facet, values in facets.items():


        if 'icon:recognizedImage' in facet:
            query = prefixes + """SELECT * WHERE {graph ?g { ?subj """ + facet + """ ?image }. ?image ?pred ?obj. ?obj a ?class; rdfs:label ?label. ?class rdfs:label ?classLabel }"""

        if 'icon:recognizedArtisticMotif' in facet:
            query = prefixes + """SELECT * WHERE {graph ?g { ?subj """ + facet + """ ?motif } ?motif icon:hasFactualMeaning ?obj. ?obj a ?class; rdfs:label ?label. ?class rdfs:label ?classLabel }"""

        if "icon:recognizedComposition" in facet:
            query = prefixes + """SELECT DISTINCT ?obj ?label WHERE {graph ?g { ?subj """ + facet + """ ?obj } ?obj rdfs:label ?label }"""

        if 'sim:hasRealityCounterpart' in facet:
            query = prefixes + """SELECT * WHERE {graph ?g {?subj icon:hasSymbol ?symbol } ?symbol sim:preventedRealityCounterpart | sim:hasRealityCounterpart  ?obj. ?obj rdfs:label ?label.}"""

        if 'sim:hasContext' in facet:
            query = prefixes + """SELECT DISTINCT * WHERE {graph ?g {?subj icon:hasSymbol ?symbol } ?symbol sim:hasContext ?obj. ?obj rdfs:label ?label}"""

        if 'dul:includesAgent' in facet:
            query = prefixes + """SELECT * WHERE {graph ?g {?subj dul:includesAgent ?obj } ?obj rdfs:label ?label }"""

        results = sparql_api.execute_get_select_query(repository, query=query)

        temp = {}
        for row in results['results']['bindings']:
            res= {}
            if 'class' in row:
                res.update({'class':row['class']['value']})
                res.update({'classLabel':row['classLabel']['value']})
            res.update({'label':row['label']['value']})
            temp.update({row['obj']['value']:res})

        sorted_dict = dict(sorted(temp.items(), key=lambda item: item[1]['label']))
        values.update(sorted_dict)

    # initialise selected_facets as empty
    selected_facets = {}

    # Handle form submission
    if request.method == "POST":

        if "clearAllBtn" in request.form:
            # Clear all selected facets
            selected_facets = {}
            result_cards = start()
        else:
            selected_facets = {
                facet: request.form.getlist(facet) for facet in facets.keys()
            }

        # handles search button of filtered search
        if "Search" in request.form:
            # Build and execute the SPARQL query
            sparql_query = prefixes + """
                SELECT ?item ?image
                WHERE {
                    OPTIONAL {?item icon:image ?image.}
                    GRAPH ?g {?interpretation icon:aboutWorkOfArt ?item.}
            """

            filter_clauses = []

            for facet, values in selected_facets.items():
                if values:
                    filter_clause = ''
                    if facet == "icon:recognizedArtisticMotif":
                        filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif. ?motif icon:hasFactualMeaning ?recognizedArtisticMotif ."
                    if facet == "icon:recognizedImage":
                        filter_clause += "?interpretation icon:recognizedImage ?img. ?img ?pred ?recognizedImage ."
                    if facet == "icon:recognizedComposition":
                        filter_clause += "?interpretation icon:recognizedComposition ?recognizedComposition. "
                    if "sim:hasContext" in facet or "sim:hasRealityCounterpart" in facet or "sim:hasSimulacrum" in facet:
                        filter_clause += '?interpretation icon:recognizedImage ?recognizedImage. ?recognizedImage icon:hasSymbol ?symbol .'
                        if facet == "sim:hasContext":
                            filter_clause += "?symbol sim:hasContext ?hasContext . "
                        if facet == "sim:hasRealityCounterpart":
                            filter_clause += "?symbol sim:preventedRealityCounterpart | sim:hasRealityCounterpart ?hasRealityCounterpart . "
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
                #image = row['image']['value']
                if item not in unique_items:
                    unique_items.add(item)
                    #result_cards.append({"item": item, "image": image})
                    result_cards.append({"item": item})

        return render_template("index.html", facets=facets, selected_facets=selected_facets, result_cards=result_cards)

    return render_template("index.html", facets=facets, selected_facets={}, result_cards=result_cards)

if __name__ == "__main__":
    app.run(debug = True, port = 8000)
