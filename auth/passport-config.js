const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserController = require("../controller/userController");
function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        //Hole User aus Datenbank
        const user = await UserController.getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: "No User with that email" })
        }
        try {
            //Prüfe ob UserPW richtig
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" })
            }
        } catch (e) {
            return done(e)
        }

    }

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        return done(null, UserController.getUserByID(id))
    });
}

module.exports = initialize;