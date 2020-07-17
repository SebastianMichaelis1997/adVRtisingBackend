
const groupModel = require("../sequelize").group;
const userGroupRelationModel = require("../sequelize").userGroupRelation;

const userIsAllowedOnGroup = async function (userID, groupID) {
    userGroupRelationModel.findOne({
        where: {
            groupID: groupID,
            userID: userID
        }
    }).then(result => {
        if (result == null) {
            console.log("user not allowed")
            return false
        } else {
            console.log("user allowed")
            return true;
        }
    })
}

module.exports = {
    userIsAllowedOnGroup: userIsAllowedOnGroup
}