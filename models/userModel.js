const userModel = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.CHAR(36),
            primaryKey: true,
            unique: true,
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
        },
        password: {
            type: type.STRING,
            allowNull: false
        }
    });
};

module.exports = userModel;