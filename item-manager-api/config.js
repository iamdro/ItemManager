var config = module.exports = {};

config.db = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'itemManager'
}

//Set this to false if you don't want sequelize creating tables for you.
config.db.createTables=true;
//For CORS, we need to know where the ui is to accept requests from it.
config.ui={
    host:'http://localhost:3001'
}
config.port=3000;