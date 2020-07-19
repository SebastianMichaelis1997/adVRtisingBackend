const projectModel = require("../sequelize").project;
const userisAllowedonProject = require("./projectController").userisAllowedonProject


const getProjectImages = async function (req, res) {
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
        res.status(200).json(JSON.parse(result.imageJSON));
    })
}

module.exports = {
    getProjectImages: getProjectImages
}