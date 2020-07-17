const projectModel = require("../sequelize").project;
const userGroupRelationModel = require("../sequelize").userGroupRelation;
const userisAllowedOnGroup = require("./groupController").userIsAllowedOnGroup;
const { Op } = require("sequelize");

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
    var userID = await (await req.user).dataValues.id;
    var projectID = req.params.pid;
    projectModel.findOne({
        where: {
            id: projectID
        }
    }).then(result => {
        if (result == null) {
            res.status(200).json({
                message: "No project with this ID"
            });
            return;
        }
        if (userisAllowedOnGroup(userID, result.groupID)) {
            res.status(401).json({
                message: "user not allowed in requested project"
            })
            return;
        }
        res.status(200).json(result);
    })
}

const getProjects = async function (req, res) {
    var userID = await (await req.user).dataValues.id;
    var useremail = await (await req.user).dataValues.email;
    console.log(useremail)
    var allProjects = [];
    var allGroups = [null];
    var results = await userGroupRelationModel.findAll({
        where: {
            userID: userID
        },
        raw: true
    })
    results.forEach(relation => {
        allGroups.push(relation.groupID)
    })
    console.log("allGroups " + allGroups)
    console.log("----------------------------------------")
    projectModel.findAll({
        where: {
            groupID: {
                [Op.or]: allGroups
            }
        },
        raw: true
    }).then(allProjects => {
        console.log(allProjects)
        res.status(200).json(allProjects)
    })
}
//Inner Functions
const userisAllowedonProject = async function (userID, projectID) {
    projectModel.findOne({
        where: {
            id: projectID
        }
    }).then(result => {
        if (result = null) {
            return false;
        }
        return userisAllowedOnGroup(userID, result.groupID)
    })
}
module.exports = {
    postProject: postProject,
    getProject: getProject,
    getProjects: getProjects
}