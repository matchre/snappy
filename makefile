
# Toutes les commandes pour mettre en ligne une nv version des fichiers

www :
	git checkout master
	git pull
	git commit -m '.' -a
	git push
	git checkout gh-pages
	git merge master
	git push origin gh-pages:gh-pages
	git checkout master

show : 
	firefox http://datagramme.fr

