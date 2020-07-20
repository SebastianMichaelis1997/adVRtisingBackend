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
var IDGroupHurensohn;
var IDGroupArschloch;
var globalRes;
const ElaspixMail = "info@elaspix.com";
const ElaspixPW = "MrMedal";

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
    var hash = await bcrypt.hash(ElaspixPW, BCRYPT_SALTROUNDS);
    user.create({
        name: "Elaspix UG",
        email: ElaspixMail,
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
    var imageJSON = [1, 3, 4];
    project.create({
        groupID: IDGroupElastixStröer,
        name: "Picadally Circus",
        imageJSON: JSON.stringify(imageJSON),
    }).then(result => {
        IDPicadallyProject = result.id;
        createHurensohnGroup();
    })
}
function createHurensohnGroup() {
    group.create({
        customerID: IDStröer,
        name: "Elaspix4Edeka@Ströer"
    }).then(result => {
        IDGroupHurensohn = result.id;
        userGroupRelation.create({
            groupID: IDGroupHurensohn,
            userID: IDElaspix
        })
        createDönerProject();
    })
}

function createDönerProject() {
    var imageJSON = [0, 1, 4];
    project.create({
        groupID: IDGroupHurensohn,
        name: "Times Square",
        imageJSON: JSON.stringify(imageJSON),
    }).then(() => {
        createArschlochGroup();
    })
}
function createArschlochGroup() {
    group.create({
        customerID: IDStröer,
        name: "@Ströer"
    }).then(result => {
        IDGroupArschloch = result.id;
        userGroupRelation.create({
            groupID: IDGroupArschloch,
            userID: "IDElaspix"
        })
        createArschlochProject();
    })
}
function createArschlochProject() {
    var imageJSON = [1, 2, 4];
    project.create({
        groupID: IDGroupArschloch,
        name: "TausendschönProject",
        imageJSON: JSON.stringify(imageJSON),
    }).then(() => {
        finish();
    })
}
function finish() {
    globalRes.status(201).json({
        message: "Datenbank initialisiert"
    })
}


module.exports = { init: initdb }