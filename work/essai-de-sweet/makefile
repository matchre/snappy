
all : test.js
	cat $^

%.js : %.jws
	sjs -o $@ $^
