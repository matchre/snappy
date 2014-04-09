
demo : server client local

client :
	echo 'opening client'
	firefox http://localhost:8080/index.html

local :
	echo 'opening client'
	firefox ./index.html

server :
	echo 'opening server'
	killall -q node ; ok=
	sh -c "xterm -geometry 120x32++1-10 -e sh -c 'node app.js ; read cont' &"
	sleep 2

doc :
	firefox http://socket.io/#how-to-use

install :
	npm install socket.io
	ln -s ./node_modules/socket.io/node_modules/socket.io-client/dist socket.io
