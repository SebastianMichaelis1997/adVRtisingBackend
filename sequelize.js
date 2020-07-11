const Sequelize = require("sequelize");
const customerModel = require("./models/customerModel");
const groupModel = require("./models/groupModel");
const imageModel = require("./models/imageModel");
const projectModel = require("./models/projectModel");
const userGroupRelationModel = require("./models/userGroupRelationModel");
const userModel = require("./models/userModel");



const conn = new Sequelize("adVrtising_test", "adVrtising_test2", "pEJntddulU9wFHk7crq1CpeloHGrEx", {
    host: "h2890789.stratoserver.net",
    dialect: "mysql",
    logging: console.log
});

const customer = customerModel(conn, Sequelize);
const group = groupModel(conn, Sequelize);
const image = imageModel(conn, Sequelize);
const project = projectModel(conn, Sequelize);
const userGroupRelation = userGroupRelationModel(conn, Sequelize);
const user = userModel(conn, Sequelize);

conn.sync().then(() => {
    console.log("Connected and synced to database");
}).catch((err) => {
    console.log('Unable to connect to the database:', err);
});

module.exports = {
    conn: conn,
    customer: customer,
    group: group,
    image: image,
    project: project,
    userGroupRelation: userGroupRelation,
    user: user
};
