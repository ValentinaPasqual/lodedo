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
repository = "edo2"
api = RepositoriesApi(api_client)
sparql_api = SparqlApi(api_client)


@app.route('/artworks/<artworkID>')
def card(artworkID):

    artwork_factual_query = """prefix icon:<http://www.example.org/> SELECT ?p ?o WHERE {icon:""" + artworkID + """?p ?o}"""
    artwork_factual_result = sparql_api.execute_get_select_query(repository, query=artwork_factual_query)

    artwork_graphs_query = """prefix icon:<http://www.example.org/> SELECT ?g WHERE { graph ?g {icon:""" + artworkID + """?p ?o}}"""
    artwork_graphs_result = sparql_api.execute_get_select_query(repository, query=artwork_graphs_query)

    artwork_graph_result = {}
    for g in artwork_graphs_result['results']['bindings']:
        graph_data = {}
        artwork_graph_query = """SELECT * WHERE { graph <""" + g["g"]["value"] + """> {?s ?p ?o} ?s rdfs:label ?sLabel. ?p rdfs:label ?pLabel. ?o rdfs:label ?oLabel. }"""
        graph_assertion_triples = sparql_api.execute_get_select_query(repository, query=artwork_graph_query)
        graph_data.update({'assertion':graph_assertion_triples})

        graph_context_query = """SELECT * WHERE { <""" + g["g"]["value"] + """> ?p ?o. ?p rdfs:label ?pLabel. ?o rdfs:label ?oLabel. }"""
        graph_context_triples = sparql_api.execute_get_select_query(repository, query=graph_context_query)
        graph_data.update({'context':graph_context_triples})

        artwork_graph_result.update({g["g"]["value"]:graph_data})

    artwork_conj_query = """prefix icon:<http://www.example.org/> SELECT ?p ?o WHERE { conj ?g {icon:""" + artworkID + """?p ?o}}"""
    artwork_conj_result = sparql_api.execute_get_select_query(repository, query=artwork_conj_query)

    return render_template('artworks.html', artwork_factual_result=artwork_factual_result, artwork_graph_result=artwork_graph_result, artwork_conj_result=artwork_conj_result)

@app.route("/", methods=["GET", "POST"])
def index():

    sparql_query = """
        prefix icon: <https://w3id.org/icon/ontology/>
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix dul: <https://dolcefaketobechanged.org/>
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
        "dul:hasQuality" : set(),
        "dul:includesAgent" : set(),
    }

    # Collect facet values from the RDF data
    for facet, values in facets.items():
        query = """
            prefix icon: <https://w3id.org/icon/ontology/>
            prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            prefix dul: <https://dolcefaketobechanged.org/>

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

    int_set = set()
    int_set.add('PreiconographicalRecognition')
    int_set.add('IconographicalRecognition')
    facets.update({'Interpretation Type': int_set})

    # Handle form submission
    if request.method == "POST":
        selected_facets = {
            facet: request.form.getlist(facet) for facet in facets.keys()
        }

        # Build and execute the SPARQL query

        sparql_query = """
            prefix icon: <https://w3id.org/icon/ontology/>
            prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            prefix dul: <https://dolcefaketobechanged.org/>
            SELECT ?item ?image
            WHERE {
                ?item icon:image ?image.
                ?interpretation icon:aboutWorkOfArt ?item.
        """

        filter_clauses = []

        for facet, values in selected_facets.items():
            print(facet)
            if values:
                filter_clause = ''
                if facet == "icon:hasFactualMeaning":
                    filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif. ?motif icon:hasFactualMeaning ?hasFactualMeaning ."
                if facet == "dul:hasQuality":
                    filter_clause += "?interpretation icon:recognizedArtisticMotif ?motif. ?motif icon:hasFactualMeaning ?hasFactualMeaning . ?motif dul:hasQuality ?hasQuality."
                if facet == "dul:includesAgent":
                    filter_clause += "?interpretation dul:includesAgent ?includesAgent."
                if facet == "Interpretation Type":
                    filter_clause += "?interpretation a ?InterpretationType."

                # adds selected filters
                if facet != "Interpretation Type":
                    filters_list = ', '.join(['<' + value + '>' for value in values])
                else:
                    filters_list = ', '.join(['icon:' + value for value in values])
                filter_clause += f"FILTER (?{facet.replace('icon:', '').replace('dul:', '').replace(' ', '')} IN ({filters_list}))."
                filter_clauses.append(filter_clause)

        if filter_clauses:
            sparql_query += ' '.join(filter_clauses)

        sparql_query += "}"

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
