const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");
const conn = sequelize.conn;
const agency = sequelize.customer;
const group = sequelize.group;
const userGroupRelation = sequelize.userGroupRelation;
const image = sequelize.image;
const project = sequelize.project;
const user = sequelize.user;
const BCRYPT_SALTROUNDS = 12;

var IDStröer;
var IDElaspix;
var IDGroupElastixStröer;
var IDPicadallyProject;
var globalRes;

var initdb = function (req, res) {
    globalRes = res;
    conn.drop().then(() => {
        console.log("Dropped");
        conn.sync().then(() => {
            console.log("synced");
            createStröer();
        });
    });

}

function createStröer() {
    agency.create({
        name: "Ströer SE & Co. KGaA",
        strHouseNr: "Ströer-Allee 1",
        zipCode: "50999",
        city: "Köln",
        country: "DE"
    }).then(result => {
        IDStröer = result.id;
        createElaspix();
    })
}

async function createElaspix() {
    var hash = await bcrypt.hash("MrMedal", BCRYPT_SALTROUNDS);
    user.create({
        name: "Elaspix UG",
        email: "info@elaspix.com",
        password: hash,
        customerID: IDStröer
    }).then(result => {
        IDElaspix = result.id;
        createElaspixStröerGroup()
    })
}

function createElaspixStröerGroup() {
    group.create({
        customerID: IDStröer,
        name: "Elaspix@Ströer"
    }).then(result => {
        IDGroupElastixStröer = result.id;
        userGroupRelation.create({
            groupID: IDGroupElastixStröer,
            userID: IDElaspix
        })
        createPicadallyProject();
    })
}

function createPicadallyProject() {
    var imageJSON = {
        image00: false,
        image01: true,
        image02: false,
        image03: true,
        image04: true
    };
    project.create({
        groupID: IDGroupElastixStröer,
        name: "Picadally Circus",
        imageJSON: JSON.stringify(imageJSON),
    }).then(result => {
        IDPicadallyProject = result.id;
        finish();
    })
}

function finish() {
    globalRes.status(201).send("Tabellen initialisiert")
}


module.exports = { init: initdb }