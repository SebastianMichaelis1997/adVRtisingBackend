const projectModel = (sequelize, type) => {
    return sequelize.define("project", {
        id: {
            type: type.CHAR(36),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        groupID: {
            type: type.CHAR(36),
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        imageJSON: {
            type: type.STRING,
            allowNull: false
        }
    });
};

module.exports = projectModel;