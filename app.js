//Import
var express = require("express");
var passport = require("passport");
var apiroutes = require("./routes/apiRoutes");
var session = require("express-session");
var methodOverride = require("method-override");
require("dotenv").config()
var initializePassport = require("./auth/passport-config");
var register = require("./controller/registerController").register;
var checkAuth = require("./auth/checkAuth");
var init = require("./initdb").init;
var register = require("./controller/registerController").register;

var app = express();

initializePassport(passport)

//Setup Express-App
{
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride("_method"));
    app.use("/unsecurelogin", (req, res, next) => {
        req.body.email = req.query.email;
        req.body.password = req.query.password;
        next()
    })
}

//Routes
app.get("/init", init);
app.use("/api", checkAuth.isLoggedIn, apiroutes);
app.get("/login", checkAuth.isLoggedOut, (req, res) => {
    res.send("logg dich ein die eumel");
});

app.post("/unsecurelogin", checkAuth.isLoggedOut, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false
}));

app.post("/login", checkAuth.isLoggedOut, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false
}));

app.delete("/logout", (req, res) => {
    req.logOut();
    console.log("logged Out");
    res.redirect("/login");
})

app.get("/", checkAuth.isLoggedIn, (req, res) => {
    res.send("logged in");
})

app.post("/register", checkAuth.isLoggedOut, register);


app.get("/checkedIsLogin", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("Login is True");
    } else {
        res.send("Login is False");
    }
})

app.get("/checkedIsLogout", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("LogOut is False");
    } else {
        res.send("LogOut is True");
    }
})


module.exports = app;
