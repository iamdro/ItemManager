const express = require("express");
const app = express();
const config = require('./config');
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var cors = require('cors');

// Setting cors
app.use(cors({origin: config.ui.host}));

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
});
const Item = sequelize.import('./models/item');
//Creates the items table if it doesn't exist.
if (config.db.createTables) {
    sequelize.sync()
}

/**
 * Returns true if the supplied item is valid.
 * @param item
 * @returns {boolean}
 */
function validateItem(item) {
    if (!item) {
        return false;
    }
    if (!item.title || item.title.length == 0 || item.title.length > 255) {
        return false;
    }
    if (!item.description || item.description.length == 0 || item.description.length > 5000) {
        return false;
    }
    if (!item.category_id || item.category_id < 0 || item.category_id > 100) {
        return false;
    }
    return true;
}

/**
 * Post
 * Adds an item defined in the body to the database.
 * Validation: The following fields are all required
 *  title must be between 1-255 characters
 *  description must be between 1-5000 characters
 *  category: between 1-100
 *
 * Example body:
    {
      "item": {
        "title": "Baseball Card",
        "description": "Cal Ripken",
        "category_id": 1
      }
    }

 */
app.post("/items", (req, res) => {
    console.log(req.body)
    let myData = req.body.item;
    if (!validateItem(myData)) {
        res.status(400).send("Supplied Item is not valid.");
    } else {
        Item.create({
                title: myData.title,
                description: myData.description,
                category_id: myData.category_id,
            })
            .then(item => {
                res.send(item);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send("Unable to save to database");
            });
    }
});
/**
 * Get
 * If an id is supplied in the query ie. ?id=1, will return a single item as JSON.
 * If no id is supplied, will return all records.
 */
app.get('/items', function (req, res) {
    console.log("Getting: " + req.query.id);
    let myId = req.query.id
    //if no id is found set the where of the sequelize to be >=0
    if (!myId) {
        myId = {$gte: 0};
    }
    Item.findAll({
        where: {
            id: myId
        }
    }).then(item => {
        res.send(item)
    })
        .catch(error => {
            //I dont w
            res.status(400).send("Error when attempting to retrieve from database");
        });

});
/**
 * Delete
 * Deletes an item specified by a query id ie. ?id=1
 *  Response sends a 200 regardless if item was deleted.
 *  Returns an error if no id is supplied, or a database error occurs.
 *  note: running the same delete twice will return a 200 both times.
 */
app.del('/items', function (req, res, next) {
    console.log("Getting: " + req.query.id);
    let myId = req.query.id
    if (!myId) {
        res.status(400).send("No id to be removed was found.");
        next()
    }
    else {
    }
    Item.destroy({
        where: {
            id: myId
        }
    }).then(() => {
        res.status(200).send("")
    }).catch(error => {
        res.status(400).send("Error trying to delete");
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + config.port);
});