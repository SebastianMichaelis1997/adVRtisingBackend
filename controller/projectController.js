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
    var userInGroup = await userisAllowedOnGroup(userID, data.groupID);
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
    projectModel.create({
        groupID: data.groupID,
        name: data.name,
        imageJSON: JSON.stringify(data.choosenImages)
    }).then(result => {
        res.status(201).json({
            message: "project crerated succesfully",
            projectID: result.id
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
    console.log(userID)
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
        console.log("user is legal")
        projectModel.destroy({
            where:
            {
                id: projectID
            }
        }).then(() => {
            console.log("project was destroyed")
            res.status(204).json({
                message: "Project deleted succesfully"
            })
        })
    })
}

const updateImages = async function (req, res) {
    var projectID = req.params.pid;
    var newImages = req.body.choosenImages;
    if (!Array.isArray(newImages)) {
        res.status(422).json({
            message: "choosenImages doesnt contain an array"
        })
        return;
    };
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

    project.update({
        imageJSON: JSON.stringify(newImages)
    }).then(() => {
        res.status(200).json({
            message: "Bilder wurden geupdatet"
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


module.exports = {
    postProject: postProject,
    getProject: getProject,
    getProjects: getProjectS,
    deleteProject: deleteProject,
    userisAllowedonProject: userisAllowedonProject,
    updateImages: updateImages
}