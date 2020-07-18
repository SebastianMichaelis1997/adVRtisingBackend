const Sequelize = require("sequelize");
const customerModel = require("./models/customerModel");
const groupModel = require("./models/groupModel");
const imageModel = require("./models/imageModel");
const projectModel = require("./models/projectModel");
const userGroupRelationModel = require("./models/userGroupRelationModel");
const userModel = require("./models/userModel");
require("dotenv").config()



const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_URL,
    dialect: process.env.DB_DIALECT,
    logging: false
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
