const userModel = require("../sequelize").user;
const customerModel = require("../sequelize").customer;
const bcrypt = require("bcrypt");
const BCRYPT_SALTROUNDS = 12;

const postUser = function (req, res) {
    //fill requestBody in local data
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        agentur_id: req.body.agentur_id
    };
    //check if all fields are valid
    for (var key in data) {
        if (data[key] == null || data[key] == "") {
            res.status(422).json({
                message: "value in field " + key + " is missing"
            });
        }
    }
    customerModel.findOne({
        where: {
            id: data.agentur_id
        },
        raw: true
    }).then(result => {
        if (result == null) {
            res.status(422).json({
                message: "illegal agentur_id"
            });
        } else {
            userModel.findOne({
                where: {
                    email: data.email
                },
                raw: true
            }).then(async user => {
                if (user != null) {
                    res.status(409).json({
                        message: "email already registered"
                    })
                } else {
                    await bcrypt.hash(data.password, BCRYPT_SALTROUNDS).then(hash => {
                        userModel.create({
                            name: data.name,
                            customerID: data.agentur_id,
                            password: hash,
                            email: data.email
                        }).then(result => {
                            res.redirect("/login");
                        })
                    })
                }
            })
        }
    })


}

module.exports = { register: postUser };