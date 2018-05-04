# Item Manager API

Item Manager API is a simple REST server that saves Items to a specified database.

# Requirements
NodeJS
Mysql

# Configuration
The application simply requires a valid mysql database connection and database specified.
You can either
+ Run the included dbSetup.sql on your mysql instance
or
+ Create a new blank schema.

Modify config.json and specify your db credentials.
If you used dbSetup.sql, the database  is itemManager

Edit config.json and set config.ui.host to where the item-manager-ui is deployed.  This is required for cors.

# Installation and running
From a command line

* npm install
* node app.js

## API methods
# GET /items/?id=123
Returns an item from the db, if id is ommited from the query, it returns all items
# POST /items
Saves an Item to the database.
* Example body:
*    {
*      "item": {
*        "title": "Baseball Card",
*        "description": "Cal Ripken",
*        "category_id": 1
*      }
*    }

# DELETE /items?id=123
Removes an item specified by the id in the query.


