const userGroupRelationModel = (sequelize, type) => {
    return sequelize.define("userGroupRelation", {
        GroupID: {
            type: type.CHAR(8),
            allowNull: false
        },
        UserID: {
            type: type.CHAR(8),
            allowNull: false
        }
    });
};

module.exports = userGroupRelationModel;