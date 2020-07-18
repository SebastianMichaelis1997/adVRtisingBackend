const router = require("express").Router();
const projectRoutes = require("./projectRoutes");

router.use("/project", projectRoutes);

module.exports = router