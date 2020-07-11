var express = require("express");
var http = require("http");

var app = express();

app.get("/", function (req, res) {
    res.send("HANS");
});

app.get("/about", function (req, res) {
    res.send("About da site");
})

app.listen(8080);