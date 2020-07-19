const router = require("express").Router();
const projectController = require("../controller/projectController");
const imageController = require("../controller/imageController");

router.post("/", projectController.postProject)
router.get("/", projectController.getProjects)
router.get("/:pid", projectController.getProject)
router.delete("/:pid", projectController.deleteProject)
router.put("/:pid", projectController.updateImages)
router.get("/:pid/images", imageController.getProjectImages)

module.exports = router;