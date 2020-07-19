const router = require("express").Router();
const projectRoutes = require("./projectRoutes");
const groupRoutes = require("./groupRoutes")

router.use("/project", projectRoutes);
router.use("/group", groupRoutes)

module.exports = router