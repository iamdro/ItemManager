const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const util = require('util');
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3001'}));


const Sequelize = require('sequelize');
const sequelize = new Sequelize('simplePost', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    });


const Item = sequelize.define('items', {
    title: Sequelize.STRING,
    description:Sequelize.TEXT,
    category_id:Sequelize.INTEGER,
});




app.post("/add", (req, res) => {
    console.log("request recieved ")
    console.log(req.body)
    let myData = req.body.item;
    console.log("title: "+myData.title)
    sequelize.sync()
        .then(() => Item.create({
            title: myData.title,
            description: myData.description,
            category_id: myData.category,
        }))
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Unable to save to database");
        });
});



app.listen(port, () => {
    console.log("Server listening on port " + port);
});