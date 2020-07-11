const Sequelize = require("sequelize");
const customerModel = require("../backend/models/customerModel");
const groupModel = require("../backend/models/groupModel");
const imageModel = require("../backend/models/imageModel");
const projectModel = require("../backend/models/projectModel");
const userGroupRelationModel = require("../backend/models/userGroupRelationModel");
const userModel = require("../backend/models/userModel");



const conn = new Sequelize("adVrtising_test", "adVrtising_test", "pEJntddulU9wFHk7crq1CpeloHGrEx", {
    host: "h2890789.stratoserver.net",
    dialect: "mysql",
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
