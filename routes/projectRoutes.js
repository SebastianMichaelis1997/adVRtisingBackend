const router = require("express").Router();
const projectController = require("../controller/projectController");

router.post("/", projectController.postProject)
router.get("/", projectController.getProjects)
router.get("/:pid", projectController.getProject)
router.delete("/:pid", projectController.deleteProject)
router.put("/:pid", projectController.updateImages)

module.exports = router;