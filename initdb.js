const sequelize = require("./sequelize");
const conn = sequelize.conn;
const customer = sequelize.customer;
const group = sequelize.group;
const userGroupRelation = sequelize.userGroupRelation;
const image = sequelize.image;
const project = sequelize.project;
const user = sequelize.user;

module.exports = function (req, res) {
    /* conn.drop().then((res) => {
         console.log("Dropped");
         conn.sync().then((res) => {
             console.log("synced");
             res.send("Tabellen leer initialisiert")
         });
     });*/
    res.send("WOLOLO")
};