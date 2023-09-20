# LODEdo

**LODedo** is a [Python 3](https://www.python.org/downloads/) web application built in [Flask](https://flask.palletsprojects.com/en/2.3.x/). 
The project is ongoing and under development.

## Quick start

The project works with this **requirement**:

- [**Python**](https://www.python.org/downloads/) v3.6.3 
- [**JAVA 11**]()

The project already has the following components installed:
- [**GraphDB standalone server**]
- [**GraphDB parser of Conjectures strong form**] - Stil under development (code from v1.0 will be released soon)

Before running the webapp follow this instructions.
- Clone this repository using the URL https://github.com/lodedo/web-app.git or download the folder.
- Packages can be installed by running **setup.sh**:
```
sh setup.sh
```
- Run GrapDB standalone server in background by navigating to **graphDB/graphdb-10.3.2/bin** and run **graphdb.cmd**

- Setup a GraphDB enviroment, repository and upload data by running **backend-setup.py**
```
python backend-setup.py
```

- Run the web-app
```
- Run **app.py**
- Open the application in your browser: **http://localhost:8000/**
