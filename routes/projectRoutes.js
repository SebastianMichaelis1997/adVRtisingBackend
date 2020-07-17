const router = require("express").Router();
//Controller einbinden

router.use("/", (req, res) => {
    res.send("Hello From Project");
})
module.exports = router;