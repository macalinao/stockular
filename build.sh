#!/bin/sh

set -e

echo "Creating Build Directory"
rm -f *.class

echo "Compiling"
javac -classpath lib/blpapi-3.8.5.1.jar:lib/gson-2.2.4.jar *.java

echo "Done"