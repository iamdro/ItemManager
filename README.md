# Item Manager API

Item Manager API is a simple REST server that saves Items to a specified database.

# Requirements
NodeJS
Mysql

# Databse Setup
The application simply requires a valid mysql database connection and schema specified.
You can either
+ Run the included dbSetup.sql on your database
or
+ Create a new blank schema.
Modify config.json and specify your db credentials.
If you used dbSetup.sql, the database (schema name) is itemManager

# Installation and running
From a command line
* npm install
* npm start
