
const groupModel = require("../sequelize").group;
const userGroupRelationModel = require("../sequelize").userGroupRelation;

const getGroup = async function (Req, res) {
    var userID = await (await req.user).id;
    var groupID = req.params.gid;
    groupModel.findOne({
        where: {
            id: groupID
        },
        raw: true
    }).then(async result => {
        if (result == null) {
            res.status(404).json({
                message: "No group with this ID"
            });
            return;
        }
        var userinGroup = await userIsAllowedOnGroup(userID, groupID);
        if (!userinGroup) {
            res.status(401).json({
                message: "user not allowed in requested group"
            })
            return;
        }
        res.status(200).json(result)
    })

}

const getGroupS = async function (Req, res) {

}

const postGroup = async function (req, res) {

}

const deleteGroup = async function (req, res) {

}

//Inner Functions
const userIsAllowedOnGroup = async function (userID, groupID) {
    var user = await userGroupRelationModel.findOne({
        where: {
            groupID: groupID,
            userID: userID
        },
        raw: true
    })
    if (user == null) {
        return false
    } else {
        return true;
    }
}

const getFirstUserGroup = async function (userID) {
    const group = await userGroupRelationModel.findOne({
        where: {
            userID: userID
        },
        raw: true
    })
    return group.groupID
}

module.exports = {
    userIsAllowedOnGroup: userIsAllowedOnGroup,
    getGroup: getGroup,
    getGroupS: getGroupS,
    postGroup: postGroup,
    deleteGroup: deleteGroup,
    getFirstUserGroup: getFirstUserGroup
}