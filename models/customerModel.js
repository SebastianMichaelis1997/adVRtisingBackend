const customerModel = (sequelize, type) => {
    return sequelize.define("customer", {
        id: {
            type: type.CHAR(36),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        strHouseNr: {
            type: type.STRING,
            allowNull: false
        },
        zipCode: {
            type: type.STRING,
            allowNull: false
        },
        city: {
            type: type.STRING,
            allowNull: false
        },
        country: {
            type: type.STRING,
            allowNull: false
        },
        additonal: {
            type: type.STRING,
            allowNull: true
        }
    });
};

module.exports = customerModel;