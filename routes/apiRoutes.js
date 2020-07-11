const router = require("express").Router();
const init = require("../initdb");

router.use("/init", init);

module.exports = router