#from __future__ import print_function
from flask import Flask
from flask import Blueprint, render_template, send_from_directory, request,  url_for, redirect, session, Response, jsonify
#import time
#from graphdb.graphdb_workbench.rest import ApiException
#from pprint import pprint

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
repository = "edo3"
api = RepositoriesApi(api_client)
sparql_api = SparqlApi(api_client)

prefixes = """prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#>
prefix icon: <https://w3id.org/icon/ontology/>
prefix lodedo: <https://w3id.org/lodedo/data/>"""

@app.route('/artworks/<artworkID>')
def card(artworkID):
    # TO DO
    artwork_factual_result = {}
    #artwork_factual_query = """TBD"""
    #artwork_factual_result = sparql_api.execute_get_select_query(repository, query=artwork_factual_query)

    scholar_ints_query = prefixes + """SELECT DISTINCT ?interpretation ?author WHERE {?interpretation icon:aboutWorkOfArt lodedo:""" + artworkID + """; dul:includesAgent ?author}"""
    scholar_ints_result = sparql_api.execute_get_select_query(repository, query=scholar_ints_query)

    authors_list = []
    for el in scholar_ints_result['results']['bindings']:
        authors_list.append(el['author']['value'])

    authors_list = list(set(authors_list))

    scholar_int_result = {}
    for author in authors_list:

        # PREICONOGRAPHICAL SIMPLE ELEMENTS
        temp = {}
        for g in scholar_ints_result['results']['bindings']:
            scholar_int_query = prefixes + """SELECT DISTINCT * WHERE { <""" + g['interpretation']['value'] + """> icon:recognizedArtisticMotif ?motif. ?motif icon:hasFactualMeaning ?meaning. OPTIONAL {?motif dul:hasQuality ?quality}}"""
            scholar_int_triples = sparql_api.execute_get_select_query(repository, query=scholar_int_query)
            temp.update({g['interpretation']['value']:scholar_int_triples['results']['bindings']})
        scholar_int_result.update({author:temp})

        # DO THE SAME FOR COMPOSITIONS

    # scholar_int_result = {}
    # for g in scholar_ints_result['results']['bindings']:
    #     scholar_int_query = """SELECT * WHERE { <""" + g['interpretation']['value'] + """> ?p ?o. ?p rdfs:label ?pLabel. OPTIONAL {?o rdfs:label ?oLabel.}}"""
    #     scholar_int_triples = sparql_api.execute_get_select_query(repository, query=scholar_int_query)
    #     scholar_int_result.update({g['interpretation']['value']:scholar_int_triples})
    #
    #     scholar_class_query = """SELECT * WHERE { <""" + g['interpretation']['value'] + """> a ?o. ?o rdfs:label ?oLabel.}"""
    #     scholar_class_triples = sparql_api.execute_get_select_query(repository, query=scholar_class_query)
    #     scholar_int_result[g['interpretation']['value']].update({'classes':scholar_class_triples})
    #
    # for int,claims in scholar_int_result.items():
    #      for claim in claims['results']['bindings']:
    #         if 'Recognized Artistic Motif'in claim['pLabel']['value'] or 'Recognized Composition' in claim['pLabel']['value']:
    #             adds_query = """SELECT * WHERE { <""" + claim['o']['value'] + """> ?p ?o. OPTIONAL {?o rdfs:label ?oLabel.}}"""
    #             adds_triples = sparql_api.execute_get_select_query(repository, query=adds_query)
    #             claim['o'].update({'others':adds_triples})


    # TO DO
    artwork_conj_result = {}
    #artwork_conj_query = """prefix icon:<http://www.example.org/> SELECT ?p ?o WHERE { conj ?g {icon:""" + artworkID + """?p ?o}}"""
    #artwork_conj_result = sparql_api.execute_get_select_query(repository, query=artwork_conj_query)

    return render_template('artworks.html', artworkID=artworkID, artwork_factual_result=artwork_factual_result, scholar_int_result=scholar_int_result, artwork_conj_result=artwork_conj_result)

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
        "icon:hasFactualMeaning" : set(),
        "obj_class_icon:hasFactualMeaning":set(),
        "dul:hasQuality" : set(),
        "dul:includesAgent" : set(),
        "subj_class_icon:aboutWorkOfArt": set(),
    }

    # Collect facet values from the RDF data
    for facet, values in facets.items():

        if 'obj_class_' in facet:
            query = prefixes + """
                SELECT DISTINCT ?class
                WHERE {
                    ?subj """ + facet.replace('obj_class_', '') + """ ?obj .
                    ?obj a ?class
                }"""

            results = sparql_api.execute_get_select_query(repository, query=query)

            for row in results['results']['bindings']:
                res = row['class']['value'].replace('file:/uploaded/generated/', '')
                values.add(res)

        if 'subj_class_' in facet:
            query = prefixes + """
                SELECT DISTINCT ?class
                WHERE {
                    ?subj """ + facet.replace('subj_class_', '') + """ ?obj .
                    ?subj a ?class
                }"""

            results = sparql_api.execute_get_select_query(repository, query=query)

            for row in results['results']['bindings']:
                res = row['class']['value'].replace('file:/uploaded/generated/', '')
                values.add(res)

        if 'class' not in facet:
            query = prefixes + """
                SELECT DISTINCT ?obj
                WHERE {
                    ?subj """ + facet + """ ?obj .
                }"""

            results = sparql_api.execute_get_select_query(repository, query=query)

            for row in results['results']['bindings']:
                res = row['obj']['value'].replace('file:/uploaded/generated/', '')
                values.add(res)

    for facet, values in facets.items():
        sorted_values = sorted(values)
        facets[facet] = sorted_values

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
                    if facet == "icon:hasFactualMeaning":
                        filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif. ?motif icon:hasFactualMeaning ?hasFactualMeaning ."
                    if facet == "dul:hasQuality":
                        filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif. ?motif icon:hasFactualMeaning ?hasFactualMeaning . ?motif dul:hasQuality ?hasQuality."
                    if facet == "dul:includesAgent":
                        filter_clause += "?interpretation dul:includesAgent ?includesAgent."
                    if facet == "subj_class_icon:aboutWorkOfArt":
                        filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif. ?interpretation a ?subj_class_aboutWorkOfArt."
                    if facet == "obj_class_icon:hasFactualMeaning":
                        filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif.  ?motif icon:hasFactualMeaning ?hasFactualMeaning. ?hasFactualMeaning a ?obj_class_hasFactualMeaning."

                    # adds selected filters
                    filters_list = ', '.join(['<' + value + '>' for value in values])
                    filter_clause += f"FILTER (?{facet.replace('icon:', '').replace('dul:', '').replace(' ', '')} IN ({filters_list}))."
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
