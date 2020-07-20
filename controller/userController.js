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

var getUser = async function (req, res) {
    var userID = await (await req.user).id;
    var user = await req.user
    res.status(200).json(user)
}
module.exports = {
    getUserByEmail: getUserByEmail,
    getUserByID: getUserByID,
    getUser: getUser
}
