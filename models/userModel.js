const userModel = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.CHAR(8),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        customerID: {
            type: type.CHAR(8),
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false
        }
    });
};

module.exports = userModel;