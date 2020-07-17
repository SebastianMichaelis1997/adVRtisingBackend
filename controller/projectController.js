const { project } = require("../sequelize");
const userGroupRelationModel = require("../models/userGroupRelationModel");
const groupModel = require("../models/groupModel");

const projectModel = require("../sequelize").project;
const userisAllowedOnGroup = require("./groupController").userIsAllowedOnGroup;

const postProject = async function (req, res) {
    const data = {
        groupID: req.body.groupID,
        name: req.body.name,
        choosenImages: req.body.choosenImages
    }
    for (var key in data) {
        if (data[key] == null || data[key] == "") {
            res.status(422).json({
                message: "value in field " + key + " is missing"
            });
            return;
        }
    }

    if (!Array.isArray(data.choosenImages)) {
        res.status(422).json({
            message: "choosenImages doesnt contain an array"
        })
        return;
    };
    //getUserID
    var userID = await (await req.user).dataValues.id;
    //Check if User is in group
    if (userisAllowedOnGroup(userID, data.groupID) == false) {
        res.status(401).json({
            message: "user not allowed in requested group"
        })
        return;
    }
    //check if project already exits in Group
    if (null != await projectModel.findOne({
        where: {
            groupID: data.groupID,
            name: data.name
        }
    })) {
        res.status(409).json({ message: "Ein Projekt mit diesem Namen exisitert bereits" });
        return;
    }
    //all legal, now do Stuff
    var imageJSON = {
        image00: false,
        image01: false,
        image02: false,
        image03: false,
        image04: false
    }
    data.choosenImages.forEach(element => {
        switch (element) {
            case 0: {
                imageJSON.image00 = true;
                break;
            }
            case 1: {
                imageJSON.image01 = true;
                break;
            }
            case 2: {
                imageJSON.image02 = true;
                break;
            }
            case 3: {
                imageJSON.image03 = true;
                break;
            }
            case 4: {
                imageJSON.image04 = true;
                break;
            }
        }
    })
    projectModel.create({
        groupID: data.groupID,
        name: data.name,
        imageJSON: JSON.stringify(imageJSON)
    }).then(result => {
        res.status(201).json({
            message: "project crerated succesfully",
            projectID: result.id
        })
    })

}

const getProject = async function (req, res) {

}
const getProjects = async function (req, res) {

}

const userisAllowedonProject = async function (userID, projectID) {
    projectModel.findOne({
        where: {
            id: projectID
        }
    }).then(result => {
        return userisAllowedOnGroup(userID, result.groupID)
    })
}
module.exports = {
    postProject: postProject,
    getProject: getProject,
    getProjects: getProjects
}