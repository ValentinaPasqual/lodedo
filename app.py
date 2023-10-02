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
api_client.set_default_header("Content-Type", "application/x-www-form-urlencoded")
repository = "LODEdo_endpoint"
api = RepositoriesApi(api_client)
sparql_api = SparqlApi(api_client)

prefixes = """
prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#>
prefix icon: <https://w3id.org/icon/ontology/>
prefix lodedo: <https://w3id.org/lodedo/>
prefix sim: <https://w3id.org/simulation/ontology/>
prefix schema:<http://schema.org/>
prefix dcterms: <http://purl.org/dc/terms/>
prefix xsd: <http://www.w3.org/2001/XMLSchema#>
prefix lodedo-conj: <https://w3id.org/lodedo/conjectures/>
prefix lodedo-graph: <https://w3id.org/lodedo/graphs/>
prefix lodedo-art: <https://w3id.org/lodedo/artworks/>
"""

def start(artworkID=None):

    if artworkID == None:
        # SELECT ALL ARTWORKS QUERY
        sparql_query = prefixes + """
            SELECT DISTINCT *
            WHERE {
                ?item schema:image ?img_src;
                    dcterms:title ?title ;
                    dcterms:created ?date.
                }
        """
    else:
        # SELECT INFORMATION FOR A SINGLE ARTWORK
        sparql_query = prefixes + """
            SELECT DISTINCT *
            WHERE {
                lodedo-art:""" + artworkID + """ schema:image ?img_src;
                    dcterms:title ?title ;
                    dcterms:created ?date.
                }
        """
    results = sparql_api.execute_get_select_query(repository, query=sparql_query)

    result_cards = []
    for row in results['results']['bindings']:
        temp = {}
        for k,v in row.items():
            temp.update({k:v['value']})
        result_cards.append(temp)

    return result_cards

@app.route('/artworks/<artworkID>')
def artwork(artworkID):

    # FACTUAL METADATA
    artwork_factual_result = start(artworkID)

    # SCHOLARS INTERPRETATIONS
    scholar_ints_query = prefixes + """SELECT ?g ?authorLabel WHERE {graph ?g {?interpretation icon:aboutWorkOfArt lodedo-art:""" + artworkID + """; dul:includesAgent ?author.} ?author rdfs:label ?authorLabel}"""
    scholar_ints_result = sparql_api.execute_get_select_query(repository, query=scholar_ints_query)

    scholars_ints = {}
    for el in scholar_ints_result['results']['bindings']:
        scholars_ints.update({el['g']['value']: el['authorLabel']['value']})

    # preiconographical interpretations
    preico_interpretations = []
    preico_query = prefixes + """SELECT ?motifHR ?motifLabel WHERE {graph ?g {?interpretation icon:aboutWorkOfArt lodedo-art:""" + artworkID + """; icon:recognizedArtisticMotif ?int} ?int icon:hasFactualMeaning ?motif. ?motif rdfs:label ?motifLabel. OPTIONAL{?motif owl:sameAs ?motifHR}}"""
    preico_result = sparql_api.execute_get_select_query(repository, query=preico_query)

    for row in preico_result['results']['bindings']:
        if 'motifHR' in row:
            preico_interpretations.append((row['motifLabel']['value'], row['motifHR']['value']))
        else:
            preico_interpretations.append((row['motifLabel']['value'], None))

    preico_interpretations = list(set(preico_interpretations))

    # AUTHOMATIC INTERPRETATIONS (symbols)
    artwork_conj_result = {}
    artwork_conj_query = prefixes + """SELECT * WHERE {conj ?g {?interpretation icon:aboutWorkOfArt lodedo-art:""" + artworkID + """; icon:recognizedImage ?reconImage. ?reconImage icon:hasSymbol ?symbol.} ?symbol sim:hasContext ?context; sim:hasSimulacrum ?simulacrum. ?context rdfs:label ?contextLabel}"""
    artwork_conj_result = sparql_api.execute_get_select_query(repository, query=artwork_conj_query)

    auto_ints = {}
    for row in artwork_conj_result['results']['bindings']:
        if row['g']['value'] not in auto_ints:
            symb_list = [row['simulacrum']['value']]
            auto_ints.update({row['g']['value']:[row['contextLabel']['value'], 1, symb_list]})
        else:
            if row['simulacrum']['value'] not in symb_list:
                symb_list.append(row['simulacrum']['value'])
                i = auto_ints[row['g']['value']][1]
                i+=1
                auto_ints.update({row['g']['value']:[row['contextLabel']['value'], i, symb_list]})

    return render_template('artworks.html', artworkID=artworkID, artwork_factual_result=artwork_factual_result, auto_ints=auto_ints, scholars_ints=scholars_ints, preico_interpretations=preico_interpretations, artwork_conj_result=artwork_conj_result)

@app.route('/conjectures/<conjID>')
def conj(conjID):

    # gets the set of automatic interpretations
    artwork_conj_result, auto_int_res, motifs_list = {}, {}, []
    artwork_conj_query = prefixes + "SELECT * WHERE {conj ?g {?interpretation icon:aboutWorkOfArt ?artwork} FILTER regex(str(?g),\"" + conjID + "\")}"
    artwork_conj_result = sparql_api.execute_get_select_query(repository, query=artwork_conj_query)

    # gets the image recognition data
    for row in artwork_conj_result['results']['bindings']:
        conj_triples_result = {}
        conj_triples_query = prefixes + "SELECT ?meaningLabel ?meaningClassLabel ?symbol ?qualityLabel WHERE {CONJ ?g {<" + row['interpretation']['value'] + "> icon:recognizedImage ?reconImage; icon:refersToArtisticMotif ?motif} ?reconImage icon:hasSymbol ?symbol. ?motif icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel; a ?meaningClass. ?meaningClass rdfs:label ?meaningClassLabel. OPTIONAL {?motif dul:hasQuality ?quality. ?quality rdfs:label ?qualityLabel} FILTER regex(str(?g),\"" + conjID + "\")}"
        conj_triples_result = sparql_api.execute_get_select_query(repository, query=conj_triples_query)
        auto_int_res.update({row['interpretation']['value']:conj_triples_result['results']['bindings']})

        # for each interpretation gets the symbol
        for row2 in conj_triples_result['results']['bindings']:
            motifs_list.append(row2['meaningLabel']['value'])
            if 'symbol' in row2:
                symbol_query = prefixes + "SELECT DISTINCT ?symbolLabel ?symbolClass ?simulacrumLabel ?realityCounterpartLabel ?symbolClass WHERE {<" + row2['symbol']['value'] + "> sim:hasContext ?context; rdfs:label ?symbolLabel; a ?symbolClass; sim:hasRealityCounterpart ?realityCounterpart; sim:hasSimulacrum ?simulacrum. ?realityCounterpart rdfs:label ?realityCounterpartLabel. OPTIONAL {?simulacrum rdfs:label ?simulacrumLabel}. OPTIONAL {?simulacrum owl:sameAs ?simulacrumHR. ?simulacrumHR rdfs:label ?simulacrumLabel} FILTER (?symbolClass != icon:Symbol)}"
                symbol_result = sparql_api.execute_get_select_query(repository, query=symbol_query)
                try:
                    auto_int_res[row['interpretation']['value']][0].update(symbol_result['results']['bindings'][0])
                except:
                    None

        motifs_list = list(set(motifs_list))

    return render_template('conjectures.html', conjID=conjID, artwork_conj_result=artwork_conj_result, auto_int_res=auto_int_res, motifs_list=motifs_list)

@app.route('/scholarlyInterpretations/<graphID>', methods=["GET", "POST"])
def graph(graphID):

    def interpretations_data_builder(graphID, part_query_string):
        result, scholar_int_triples = {}, {}
        scholar_int_query = prefixes + "SELECT DISTINCT * WHERE {graph lodedo-graph:" + graphID+ " {" + part_query_string
        scholar_int_triples = sparql_api.execute_get_select_query(repository, query=scholar_int_query)

        for row in scholar_int_triples['results']['bindings']:
            temp = {}
            for k,v in row.items():
                temp.update({k:v['value']})
                result.update({row['interpretation']['value']:temp})

        return result

    def scholars_interpretations_builder(graphID):
        scholar_ints, symbol_ints = {}, {}

        # get all symbols
        query = "SELECT ?symbol ?simulacrum ?realityCounterpart ?context ?g WHERE {conj ?g {?symbol a sim:Symbol.}}"

        # PREICONOGRAPHICAL INTERPRETATIONS
        ints_part_query_string = """?interpretation icon:recognizedArtisticMotif ?recog.} ?recog icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel. ?meaning a ?class. ?class rdfs:label ?classLabel. OPTIONAL {?recog dul:hasQuality ?quality. ?quality rdfs:label ?qualityLabel} OPTIONAL {?recog icon:isPartOf ?composition} } """
        scholar_ints.update({'Preiconographical': interpretations_data_builder(graphID, ints_part_query_string)})

        #COMPOSITIONS RECOGNITIONS
        comps_part_query_string = """?interpretation icon:recognizedComposition ?composition. } ?composition icon:hasPart ?recog. ?recog icon:hasFactualMeaning ?meaning. ?meaning rdfs:label ?meaningLabel. ?meaning a ?class. ?class rdfs:label ?classLabel. }"""
        scholar_ints.update({'Composition': interpretations_data_builder(graphID, comps_part_query_string)})

        #ICONOGRAPHICAL INTERPRETATIONS
        icon_part_query_string = """?interpretation icon:recognizedImage ?recog. ?recog ?pred ?meaning . } ?meaning a ?class. ?meaning rdfs:label ?meaningLabel. ?class rdfs:label ?classLabel } """
        scholar_ints.update({'Iconographical':interpretations_data_builder(graphID, icon_part_query_string)})

        # SYMBOLS RECOGNITIONS
        symbol_part_query_string = """?interpretation icon:recognizedImage ?recog. ?recog icon:hasSymbol ?meaning .} ?meaning sim:hasContext ?context . ?meaning sim:hasRealityCounterpart ?realityCounterpart . ?realityCounterpart rdfs:label ?realityCounterpartLabel. ?meaning sim:hasSimulacrum ?simulacrum . ?context rdfs:label ?contextLabel. ?simulacrum rdfs:label ?simulacrumLabel}"""
        symbol_ints = interpretations_data_builder(graphID, symbol_part_query_string)

        return scholar_ints, symbol_ints

    int_metadata_result = {}
    int_metadata_query = prefixes + "SELECT DISTINCT ?artwork ?agentLabel ?title WHERE {graph lodedo-graph:" + graphID+ " {?interpretation icon:aboutWorkOfArt ?artwork; dul:includesAgent ?agent.} ?agent rdfs:label ?agentLabel. ?artwork dcterms:title ?title}"
    int_metadata_result = sparql_api.execute_get_select_query(repository, query=int_metadata_query)

    other_ints_to_compare = {}
    for row in int_metadata_result['results']['bindings']:
        comp_graphs_query = prefixes + "SELECT DISTINCT ?g ?agentLabel WHERE {graph ?g {?interpretation icon:aboutWorkOfArt <"+row['artwork']['value']+">; dul:includesAgent ?agent} ?agent rdfs:label ?agentLabel. FILTER(?g != lodedo-graph:"+graphID+")}"
        other_ints_to_compare = sparql_api.execute_get_select_query(repository, query=comp_graphs_query)

    scholar_ints, symbol_ints = {}, {}
    scholar_ints, symbol_ints = scholars_interpretations_builder(graphID)
    comp_scholar_ints, comp_symbol_ints = {},{}

    return render_template('graphs.html', int_metadata_result=int_metadata_result, graphID=graphID, other_ints_to_compare=other_ints_to_compare, scholar_ints=scholar_ints, symbol_ints=symbol_ints, comp_scholar_ints={}, comp_symbol_ints={})

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
            query = prefixes + """
            SELECT (count(?obj) as ?n) ?obj ?class ?label ?classLabel
            WHERE {graph ?g { ?subj """+ facet +""" ?image }. ?image ?pred ?obj. ?obj a ?class; rdfs:label ?label. ?class rdfs:label ?classLabel }
            GROUP BY ?obj ?class ?label ?classLabel ORDER BY DESC (?n)
            """

        if 'icon:recognizedArtisticMotif' in facet:
            query = prefixes + """SELECT ?obj ?label ?class ?classLabel WHERE {graph ?g { ?subj """ + facet + """ ?motif } ?motif icon:hasFactualMeaning ?obj. ?obj a ?class; rdfs:label ?label. ?class rdfs:label ?classLabel }"""

        if "icon:recognizedComposition" in facet:
            query = prefixes + """SELECT DISTINCT ?obj ?label WHERE {graph ?g { ?subj """ + facet + """ ?obj } ?obj rdfs:label ?label }"""

        if 'sim:hasRealityCounterpart' in facet:
            query = prefixes + """SELECT ?obj ?label WHERE {graph ?g {?subj icon:hasSymbol ?symbol } ?symbol sim:preventedRealityCounterpart | sim:hasRealityCounterpart  ?obj. ?obj rdfs:label ?label.}"""

        if 'sim:hasContext' in facet:
            query = prefixes + """SELECT DISTINCT ?obj ?label WHERE {graph ?g {?subj icon:hasSymbol ?symbol } ?symbol sim:hasContext ?obj. ?obj rdfs:label ?label}"""

        if 'dul:includesAgent' in facet:
            query = prefixes + """SELECT ?obj ?label WHERE {graph ?g {?subj dul:includesAgent ?obj } ?obj rdfs:label ?label }"""

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
                SELECT *
                WHERE {
                        ?item schema:image ?img_src;
                            dcterms:title ?title ;
                            dcterms:created ?date.
                    graph ?g {?interpretation icon:aboutWorkOfArt ?item.}
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

            results = sparql_api.execute_get_select_query(repository, query=sparql_query)

            result_cards = []
            unique_items = set()
            for row in results['results']['bindings']:
                item = row['item']['value']
                image = row['img_src']['value']
                date = row['date']['value']
                title = row['title']['value']
                if item not in unique_items:
                    unique_items.add(item)
                    result_cards.append({"item": item, "img_src": image, "date" : date, "title" : title})


        return render_template("index.html", facets=facets, selected_facets=selected_facets, result_cards=result_cards)

    return render_template("index.html", facets=facets, selected_facets={}, result_cards=result_cards)

# ENDPOINT

@app.route("/sparql", methods=['GET', 'POST'])
def sparql_gui(active=None):
	return render_template('sparql.html',active=active)

@app.errorhandler(403)
def page_not_found(e):
	# note that we set the 403 status explicitly
	return render_template('403.html'), 403

@app.errorhandler(500)
def server_error(e):
	# note that we set the 403 status explicitly
	return render_template('500.html'), 500

@app.route('/process_query', methods=['POST'])
def process_query():
    data = request.get_json()
    query = data['string']
    query_result = sparql_api.execute_get_select_query(repository, query=query)

    if 'select' in query.lower() or 'construct' in query.lower():
        if isinstance(query_result, str):
            return render_template('500.html'), 500
        else:
            # If the query result is a JSON response, return it as JSON
            return jsonify(query_result)
    else:
        return render_template('403.html'), 403

if __name__ == "__main__":
    app.run(debug = True, port = 8000)
