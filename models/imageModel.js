const imageModel = (sequelize, type) => {
    return sequelize.define("image", {
        id: {
            type: type.CHAR(36),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        filePath: {
            type: type.STRING,
            allowNull: false,
            uniqe: true
        }
    });
};

module.exports = imageModel; 