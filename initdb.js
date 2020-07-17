const sequelize = require("./sequelize");
const conn = sequelize.conn;
const customer = sequelize.customer;
const group = sequelize.group;
const userGroupRelation = sequelize.userGroupRelation;
const image = sequelize.image;
const project = sequelize.project;
const user = sequelize.user;

var initdb = function (req, res) {
    conn.drop().then(() => {
        console.log("Dropped");
        conn.sync().then(() => {
            console.log("synced");
            res.status(201).send("Tabellen leer initialisiert")
        });
    });

}


module.exports = { init: initdb }