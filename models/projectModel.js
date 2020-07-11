const projectModel = (sequelize, type) => {
    return sequelize.define("project", {
        id: {
            type: type.CHAR(8),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        GroupID: {
            type: type.CHAR(8),
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        ImageJSON: {
            type: type.STRING,
            allowNull: false
        }
    });
};

module.exports = projectModel;