const groupModel = (sequelize, type) => {
    return sequelize.define("group", {
        id: {
            type: type.CHAR(36),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        customerID: {
            type: type.CHAR(36),
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false,
        }
    });
};

module.exports = groupModel;