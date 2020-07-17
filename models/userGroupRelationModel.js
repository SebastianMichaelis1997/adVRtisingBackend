const userGroupRelationModel = (sequelize, type) => {
    return sequelize.define("userGroupRelation", {
        groupID: {
            type: type.CHAR(36),
            allowNull: false
        },
        userID: {
            type: type.CHAR(36),
            allowNull: false
        }
    });
};

module.exports = userGroupRelationModel;