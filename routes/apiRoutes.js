const router = require("express").Router();
const projectRoutes = require("./projectRoutes");
const groupRoutes = require("./groupRoutes")
const userController = require("../controller/userController")

router.get("/user", userController.getUser)
router.use("/project", projectRoutes);
router.use("/group", groupRoutes)

module.exports = router