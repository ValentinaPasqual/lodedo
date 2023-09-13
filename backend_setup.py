from graphdb.rdf4j.api_client import ApiClient
from graphdb.graphdb_workbench import RepositoryManagementControllerApi
from graphdb.rdf4j.configuration import Configuration
from graphdb.rdf4j.rest import ApiException
import graphdb.rdf4j
import requests
from rdflib import Graph
from graphdb.mime_types import RDFTypes
from graphdb.rdf4j.api.repositories_api import RepositoriesApi

# Configure the access controller
conf = Configuration()
conf.host = "http://localhost:7200/"  # Replace with your GraphDB endpoint

# Create an ApiClient instance with the access controller
api_client = ApiClient(configuration=conf)
#
# #Create a RepositoryManagementControllerApi instance with the ApiClient
# api_instance = RepositoryManagementControllerApi(api_client)
#
# # Repository information
# config = "C:/Users/valep/Documents/GitHub/lodedo/graphDB/edo4-config.ttl"
#
# try:
#     # Attempt to create the new repository via the REST API
#     response = api_instance.create_repository_using_post(config=config)
#
#     if response.status_code == 200:
#         print("Repository created successfully.")
#     else:
#         print(f"Failed to create repository. Status code: {response.status_code}")
# except Exception as e:
#     print("Error:", str(e))


# Load data from a Turtle file into the RDF Graph
file_path = "graphDB/data/lodedo.ttl"  # Replace with the path to your Turtle file

with open(file_path, 'r', encoding='utf-8') as file:
    rdf_data = file.read()

api_client.set_default_header("Content-Type", RDFTypes.TURTLE)
repository = "EHEHEH3"
api = RepositoriesApi(api_client)
api.put_statements(repository, rdf_data=rdf_data)
