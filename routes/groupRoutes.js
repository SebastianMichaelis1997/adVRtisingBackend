const router = require("express").Router();
const groupController = require("../controller/groupController");

router.post("/", groupController.postGroup)
router.get("/", groupController.getGroupS)
router.get("/:gid", groupController.getGroup)
router.delete("/:gid", groupController.deleteGroup)

module.exports = router;