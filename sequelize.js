const Sequelize = require("sequelize");
/*
const adressModel = require("./models/adressModel");
*/
const conn = new Sequelize("billherotest", "billhero2", "billiboi", {
    host: "h2580603.stratoserver.net",
    dialect: "mysql",
    logging: false
});
/*
const adress = adressModel(conn, Sequelize);
*/

conn.sync().then(() => {
    console.log("Connected and synced to database");
});

module.exports = {
    conn: conn
    /*
    adress: adress
    */
};
