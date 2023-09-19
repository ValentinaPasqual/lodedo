All GraphDB programming examples are provided as a Maven project.

Since GraphDB is not available from Maven Central (the public Maven repository),
you have to install the GraphDB runtime jar into your local Maven repository.

To do that, go to the examples/maven-installer subdirectory of the distribution and run:

  mvn install

Note that the Maven executable, mvn, must be in your path.