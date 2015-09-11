
# Toutes les commandes pour mettre en ligne une nv version des fichiers

www :
	#git checkout master
	#git pull
	#-git commit -m '.' -a
	#git push
	git checkout gh-pages
	git pull origin gh-pages
	git merge master
	git push origin gh-pages:gh-pages
	git checkout master

show : 
	firefox http://inriamecsci.github.io/snappy/
server:
	cd WebServer && \
	echo "compiling java classes" && \
	javac org/webmobinet/simplewebserver/*.java && \
	echo "removing old webserver jar" && \
	rm WebServer.jar && \
	rm ../snappy.jar && \
	echo "packaging new jar" && \
	jar cmf META-INF/MANIFEST.MF WebServer.jar . && \
	cp WebServer.jar ../snappy.jar 
	
