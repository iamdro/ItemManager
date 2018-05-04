# Item Manager API

Item Manager API is a simple REST server that saves Items to a specified database.

# Requirements
+ NodeJS
+ Mysql

# Configuration
The application simply requires a valid mysql database connection and database specified.
You can either:
+ Run the included dbSetup.sql on your mysql instance
+ Create a new blank schema.

Modify config.json and specify your db credentials.
If you used dbSetup.sql, the database  is itemManager

After the  database has been created:
+ Edit config.json and set config.ui.host to where the item-manager-ui is deployed.  This is required for cors.

# Installation and running
From a command line at the item-manager-api directory
```sh
$ npm install
$ node app.js

```
## API methods

> GET /items/?id=123

Returns an item from the db, if id is ommited from the query, it returns all items

> POST /items

Saves an Item to the database.
**Examble Body:**
```js
    {
      "item": {
      "title": "Baseball Card",
      "description": "Cal Ripken",
      "category_id": 1
      }
    }
```

> DELETE /items?id=123

Removes an item specified by the id in the query.

# Testing

There is a suite of integrations scripts located in the application.
To run them, first install mocha
```sh
$ npm install -g mocha
```

With the server running, in a terminal window at the root of the *item-manager-api* directory run the command
```sh
$ mocha
```
