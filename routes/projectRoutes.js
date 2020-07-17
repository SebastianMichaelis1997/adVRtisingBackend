const router = require("express").Router();
const projectController = require("../controller/projectController");
const projectModel = require("../models/projectModel");

router.post("/", projectController.postProject)
router.get("/", projectController.getProjects)
router.get("/:pid", projectController.getProject)

module.exports = router;