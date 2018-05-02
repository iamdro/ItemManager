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

function validateItem(item){
    if (!item){
        return false;
    }
    if (!item.title || item.title.length==0||item.title.length>255){
        return false;
    }
    if (!item.description || item.description.length==0||item.description.length>255){
        return false;
    }
    if (!item.category_id || item.category_id<0||item.category_id>255){
        return false;
    }
    return true;
}


app.post("/items", (req, res) => {
    console.log(req.body)
    let myData = req.body.item;
    if(!validateItem(myData)){
        res.status(400).send("Invalid item trying to be saved");
    }else {
        sequelize.sync()
            .then(() => Item.create({
                title: myData.title,
                description: myData.description,
                category_id: myData.category_id,
            }))
            .then(item => {
                res.send(item);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send("Unable to save to database");
            });
    }
});

app.get("/get", (req, res) => {
    console.log(req.body)
    let myData = req.body.item;
    if(!validateItem(myData)){
        res.status(400).send("Invalid item trying to be saved");
    }else {
        sequelize.sync()
            .then(() => Item.create({
                title: myData.title,
                description: myData.description,
                category_id: myData.category_id,
            }))
            .then(item => {
                res.send(item);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send("Unable to save to database");
            });
    }
});



app.listen(port, () => {
    console.log("Server listening on port " + port);
});