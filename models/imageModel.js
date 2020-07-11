const imageModel = (sequelize, type) => {
    return sequelize.define("image", {
        id: {
            type: type.CHAR(8),
            primaryKey: true,
            uniqe: true,
            defaultValue: type.UUIDV1
        },
        filePath: {
            type: type.String,
            allowNull: false,
            uniqe: true
        }
    });
};

module.exports = imageModel; 