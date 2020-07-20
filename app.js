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
var path = require("path");
var scriptController = require("./controller/scriptContoller")

var app = express();

initializePassport(passport)

//Setup Express-App
{
    var basePath = path.join(__dirname + "/views/")
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
    app.use((req, res, next) => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log(dateTime + " " + req.method + " " + req.url);
        next()
    })
}
//ScriptRoutes
app.get("/scripts/:script", scriptController.getScriptByName)

app.use("/print", (req, res) => {
    console.log(req.body)
    res.redirect("/projects")
})
//Websiteroutes
app.get("/login", checkAuth.isLoggedOut, (req, res) => {
    res.sendFile(path.join(basePath + "login.html"))
});

app.get("/", checkAuth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(basePath + "root.html"))
})

app.get("/projects", checkAuth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(basePath + "projects.html"))
})
//Routes
app.get("/init", init);
app.use("/api", checkAuth.isLoggedIn, apiroutes);

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
    res.redirect("/login");
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
