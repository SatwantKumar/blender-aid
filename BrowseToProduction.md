When adding a new production, the location to the production needs to be textually entered as an absolute path. It should be better to use a browse function where it is possible to select the directory you want to use as a production-root.

# choose directory #

# impact #
  * update documentation
  * update website
  * testcase
  * settings.py ==> default location of the productions can be configured
  * server.py ==> redirect json services to the servicefilesystembrowser.py
  * servicefilesystembrowser.py (new) ==> implement all services of the filesystembrowser
  * productions.html ==> UI logic for the browse functionality