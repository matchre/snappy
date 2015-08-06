echo "compiling java classes"
javac org/webmobinet/simplewebserver/*.java 
echo "removing old jar"
rm WebServer.jar 
echo "packaging new jar"
jar cmf META-INF/MANIFEST.MF WebServer.jar .

