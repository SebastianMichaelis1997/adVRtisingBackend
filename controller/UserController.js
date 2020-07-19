var userModel = require("../sequelize").user;

var getUserByEmail = async function (email) {
    const user = await userModel.findOne({
        where: {
            email: email
        },
        raw: true
    })
    return user;
}

var getUserByID = async function (id) {
    const user = await userModel.findOne({
        where: {
            id: id
        },
        raw: true
    })
    return user;
}

module.exports = {
    getUserByEmail: getUserByEmail,
    getUserByID: getUserByID
}