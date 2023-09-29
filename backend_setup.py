from graphdb.rdf4j.api_client import ApiClient
from graphdb.graphdb_workbench import RepositoryManagementControllerApi
from graphdb.rdf4j.configuration import Configuration
from graphdb.rdf4j.rest import ApiException
import graphdb.rdf4j
import requests

from rdflib import Graph
from graphdb.mime_types import RDFTypes
from graphdb.rdf4j.api.repositories_api import RepositoriesApi
import os

# Configure the access controller
conf = Configuration()
conf.host = "http://localhost:7200/"  # Replace with your GraphDB endpoint

# Create an ApiClient instance with the access controller
api_client = ApiClient(configuration=conf)

#Create a RepositoryManagementControllerApi instance with the ApiClient
api_instance = RepositoryManagementControllerApi(api_client)

# Repository information
config = "C:/Users/valep/Documents/GitHub/lodedo/graphDB/LODEdo_endpoint_config.ttl"

try:
    # Attempt to create the new repository via the REST API
    response = api_instance.create_repository_using_post(config=config)

    if response.status_code == 200:
        print("Repository created successfully.")
    else:
        print(f"Failed to create repository. Status code: {response.status_code}")
except Exception as e:
    print("Error:", str(e))

# The repository name
repository = "LODEdo_endpoint"

# Directory containing the RDF files
directory_path = "graphDB/data/"

# Create a session
session = requests.Session()

# Define the upload URL
upload_url = f'http://localhost:7200/repositories/{repository}/statements'

# Iterate through all files in the directory
for filename in os.listdir(directory_path):
    # Check if the file has a valid RDF extension (e.g., .ttl, .trig, .owl)
    if filename.endswith(('.ttl', '.trig', '.owl')):
        # Determine the appropriate Content-Type header based on the file extension
        if filename.endswith('.ttl'):
            content_type = 'application/x-turtle; charset=utf-8'
        elif filename.endswith('.trig'):
            content_type = 'application/trig; charset=utf-8'
        elif filename.endswith('.owl'):
            content_type = 'application/rdf+xml; charset=utf-8'

        # Construct the full path to the RDF file
        rdf_file = os.path.join(directory_path, filename)

        # Set headers for the request
        headers = {
            'Content-Type': content_type,
        }

        # Open and read the RDF file
        with open(rdf_file, 'rb') as rdf_data:
            # Send the RDF data to GraphDB
            response = session.post(upload_url, data=rdf_data, headers=headers)

        # Check the response
        if response.status_code == 204 or response.status_code == 200:
            print(f'RDF data from {filename} uploaded successfully to repository {repository}')
        else:
            print(f'Error uploading RDF data from {filename}: {response.status_code} - {response.text}')
