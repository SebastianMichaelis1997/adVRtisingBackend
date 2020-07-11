const groupModel = (sequelize, type) => {
    return sequelize.define("group", {
        id: {
            type: type.CHAR(8),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        customerID: {
            type: type.CHAR(8),
            allowNull: false
        }
    });
};

module.exports = groupModel;