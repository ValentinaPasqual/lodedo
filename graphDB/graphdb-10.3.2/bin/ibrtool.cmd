@echo off

call "%~dp0"\graphdb-java.in.cmd %GDB_JAVA_OPTS% -Djdk.xml.entityExpansionLimit=0 util.SourceRepositorySnapshot %*
