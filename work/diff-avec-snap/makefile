all :
	@$(MAKE) clean
#	Download the snap sources
	wget -q https://github.com/jmoenig/Snap--Build-Your-Own-Blocks/archive/master.zip ; unzip -q master.zip
	rm -f diff.log.txt
#	Checks files missing locally
	echo ; cd Snap--Build-Your-Own-Blocks-master ; for f in *.js ; do \
	  if [ ! -f ../../../js/$$f ] ; then echo "File $$f of remote snap not in local webmobinet" ; fi ;\
        done >> ../diff.log.txt
#	Checks files missing remotelly
	echo ; cd ../../js ; for f in *.js ; do \
	  if [ ! -f ../work/diff-avec-snap/Snap--Build-Your-Own-Blocks-master/$$f ] ; then echo "File $$f in local webmobinet not on remote snap" ; fi ;\
        done >> ../work/diff-avec-snap/diff.log.txt
#	Performs the diff on each file
	echo ; cd ../../js ; for f in *.js ; do if [ -f ../work/diff-avec-snap/Snap--Build-Your-Own-Blocks-master/$$f ] ; then \
          echo ; echo "> $$f ----------------------" ; echo ;\
          diff $$f ../work/diff-avec-snap/Snap--Build-Your-Own-Blocks-master/$$f ;\
        fi ; done >> ../work/diff-avec-snap/diff.log.txt
#	Cleanup
	@$(MAKE) clean

clean :
	@rm -rf master.zip Snap--Build-Your-Own-Blocks-master
