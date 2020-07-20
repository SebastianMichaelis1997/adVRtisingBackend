const { image } = require("../sequelize");

const projectModel = require("../sequelize").project;
const userGroupRelationModel = require("../sequelize").userGroupRelation;
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
    var userID = await (await req.user).id;
    //Check if User is in group
    if (!await userisAllowedOnGroup(userID, data.groupID)) {
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
        },
        raw: true
    })) {
        res.status(409).json({ message: "Ein Projekt mit diesem Namen exisitert bereits" });
        return;
    }
    //all legal, now do Stuff
    data.choosenImages = validateImageArray(data.choosenImages);
    projectModel.create({
        groupID: data.groupID,
        name: data.name,
        imageJSON: JSON.stringify(data.choosenImages)
    }).then(result => {
        res.status(201).json({
            message: "project crerated succesfully",
            projectID: result.id,
        })
    })

}

const getProject = async function (req, res) {
    var userID = await (await req.user).id;
    var projectID = req.params.pid;
    projectModel.findOne({
        where: {
            id: projectID
        },
        raw: true
    }).then(async result => {
        if (result == null) {
            res.status(404).json({
                message: "No project with this ID"
            });
            return;
        }
        var userinProject = await userisAllowedonProject(userID, result.id);
        if (!userinProject) {
            res.status(401).json({
                message: "user not allowed in requested group"
            })
            return;
        }
        result.imageJSON = JSON.parse(result.imageJSON);
        res.status(200).json(result);
    })
}

const getProjectS = async function (req, res) {
    var userID = await (await req.user).id;
    var allGroups = [];
    var results = await userGroupRelationModel.findAll({
        where: {
            userID: userID
        },
        raw: true
    })
    results.forEach(relation => {
        allGroups.push(relation.groupID)
    })
    projectModel.findAll({
        where: {
            groupID: allGroups
        },
        raw: true
    }).then(allProjects => {
        allProjects.forEach(project => {
            project.imageJSON = JSON.parse(project.imageJSON);
        })
        res.status(200).json(allProjects)
    })
}

const deleteProject = async function (req, res) {
    var userID = await (await req.user).id;
    var projectID = req.params.pid;
    projectModel.findOne({
        where: {
            id: projectID
        },
        raw: true
    }).then(async result => {
        if (result == null) {
            res.status(404).json({
                message: "No project with this ID"
            });
            return;
        }
        var userinProject = await userisAllowedonProject(userID, projectID);
        if (!userinProject) {
            res.status(401).json({
                message: "user not allowed in requested group"
            })
            return;
        }
        projectModel.destroy({
            where:
            {
                id: projectID
            }
        }).then(() => {
            res.status(204).json({
                message: "Project deleted succesfully"
            })
        })
    })
}

const updateImages = async function (req, res) {
    var projectID = req.params.pid;
    var newImages = [];
    if ("choosenImages" in req.body) {
        if (!Array.isArray(req.body.choosenImages)) {
            newImages.push((req.body.choosenImages * 1))
        } else {
            req.body.choosenImages.forEach(num => {
                newImages.push((num * 1))
            })
        }
    }
    var project = await projectModel.findOne({
        where: {
            id: projectID
        }
    })
    if (project == null) {
        res.status(404).json({
            message: "No project with this ID"
        });
        return;
    }
    //getUserID
    var userID = await (await req.user).id;
    //Check if User is in group
    var userinProject = await userisAllowedonProject(userID, projectID);
    if (!userinProject) {
        res.status(401).json({
            message: "user not allowed in requested group"
        })
        return;
    }
    //all legal, now do Stuff
    newImages = validateImageArray(newImages);
    project.update({
        imageJSON: JSON.stringify(newImages)
    }).then(() => {
        res.redirect("/projects");
    })
}

const getProjectsIDs = async (req, res) => {
    var userID = await (await req.user).id;
    var allGroups = [];
    var results = await userGroupRelationModel.findAll({
        where: {
            userID: userID
        },
        raw: true
    })
    results.forEach(relation => {
        allGroups.push(relation.groupID)
    })
    projectModel.findAll({
        where: {
            groupID: allGroups
        },
        raw: true
    }).then(allProjects => {
        var projectIDs = []
        allProjects.forEach(project => {
            projectIDs.push(project.id)
        })
        res.status(200).json({
            projectIDs: projectIDs
        })
    })
}

//Inner Functions
const userisAllowedonProject = async function (userID, projectID) {
    var project = await projectModel.findOne({
        where: {
            id: projectID
        },
        raw: true
    })
    if (project == null) {
        return false;
    } else {
        var isInGroup = await userisAllowedOnGroup(userID, project.groupID);
        return isInGroup;
    }
}

const validateImageArray = function (imageArray) {
    if (imageArray.length == 0) {
        return imageArray
    }
    var imageArray = imageArray.filter(function (el) {
        return el != null;
    });
    for (var i = 0; i < imageArray.length; i++) {
        for (var j = 0; j < imageArray.length - i - 1; j++) {
            if (imageArray[j] > imageArray[j + 1]) {
                var temp = imageArray[j];
                imageArray[j] = imageArray[j + 1];
                imageArray[j + 1] = temp;
            }
        }
    }
    var last = -1;
    var newArray = []
    imageArray.forEach(value => {
        if (value <= 4 && value >= 0 && value != last && !(typeof value == "undefined")) {
            last = value;
            newArray.push(value);
        }
    })
    return newArray
}

module.exports = {
    postProject: postProject,
    getProject: getProject,
    getProjects: getProjectS,
    deleteProject: deleteProject,
    userisAllowedonProject: userisAllowedonProject,
    updateImages: updateImages,
    getProjectsIDs: getProjectsIDs
}