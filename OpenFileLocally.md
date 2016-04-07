When the system is installed on your workstation there is a possibility to direct open the file.

At the moment open file is somewhat confusing as there are several manual steps needed (copy link location, start run application, paste)

# service #
## open file service ##
First implement with blend files only.

**input**

  * production\_id ==> id of the production the file is part of
  * file\_id ==> id of the file to be opened

**output**

none

# Impact #
  * server.py ==> redirect json service
  * serviceproduction.py ==> implement open file service
  * settings.py ==> add switch (server based computing, local) blender path etc
  * file.html ==> UI component for triggering service
  * user manual
  * website
  * testcase