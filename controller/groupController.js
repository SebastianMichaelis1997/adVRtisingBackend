
const groupModel = require("../sequelize").group;
const userGroupRelationModel = require("../sequelize").userGroupRelation;

const userIsAllowedOnGroup = async function (userID, groupID) {
    var user = await userGroupRelationModel.findOne({
        where: {
            groupID: groupID,
            userID: userID
        }
    })
    if (user == null) {
        return false
    } else {
        return true;
    }
}

module.exports = {
    userIsAllowedOnGroup: userIsAllowedOnGroup
}