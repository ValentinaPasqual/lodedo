import requests
import json

# Set the GraphDB server URL and repository name
graphdb_url = "http://localhost:7200"
repository_name = "myReadOnlyRepository"

# Define the repository creation payload
payload = {
    "id": repository_name,
    "config": {
        "repository.type": "graphdb:FreeSailRepository",
        "repository.cache.enabled": False,
        "repository.readonly": True,
        "repository.preload": True,
        "repository.params": {
            "sesame.ignore.config": "true",
            "index.type": "in-memory-memory"
        }
    }
}

# Set the headers
headers = {
    "Content-Type": "application/json"
}

# Construct the repository creation URL
repository_creation_url = f"{graphdb_url}/rest/repositories"

# Send the POST request to create the repository
response = requests.post(repository_creation_url, headers=headers, data=json.dumps(payload))

# Check the response
if response.status_code == 201:
    print(f"Repository '{repository_name}' created successfully.")
else:
    print(f"Failed to create the repository. Status code: {response.status_code}")
    print(response.text)
