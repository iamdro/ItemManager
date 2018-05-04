# Item Manager
Item manager has 2 components
* Item-Manager-API
* Item-Manager-UI

each component has it's own documentation which can be found in their respective readme files.

## Easy Install and Deploy
# Requirements
* NodeJs
* Mysql databse with an empy schema

# Setup
-Modify item-manager-api/config.js with your databse credetials. The api will create the required tables on a successful first run.
-From a command line
```sh
$ chmod +x installAndRun.sh
$ ./installAndRun.sh
```
if you encounter any errors, read each components corresponding documentation on how to build and deploy