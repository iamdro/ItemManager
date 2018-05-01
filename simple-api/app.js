const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const util = require('util');

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



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    let myData = req.body;
    sequelize.sync()
        .then(() => Item.create({
            title: myData.firstName,
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