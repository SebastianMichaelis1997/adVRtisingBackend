const router = require("express").Router();
const init = require("../initdb").init;
const projectRoutes = require("./projectRoutes");

router.get("/init", init);
router.use("/project", projectRoutes);

module.exports = router