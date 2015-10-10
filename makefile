
# Toutes les commandes pour mettre en ligne une nv version des fichiers

www :
# Mise à jour des sources
	git checkout master
	git pull
	-git commit -m '.' -a
	git push
# Mise à jour des pages web
	git checkout gh-pages
	#git pull
	git pull origin gh-pages
	git merge master
	git push origin gh-pages:gh-pages
# Retour à la branche principale
	git checkout master

show : 
	firefox https://pixees.fr/?p=5099

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
