var path = require("path");
var scriptPath = path.join(__dirname + "/../scripts/")

const getScriptByName = (req, res) => {
    var scriptname = req.params.script
    res.sendFile(path.join(scriptPath + scriptname))
}

module.exports = {
    getScriptByName: getScriptByName
}