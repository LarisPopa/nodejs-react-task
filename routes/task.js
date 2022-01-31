const router = require("express").Router();
const taskController = require("../controller/task");
const { auth } = require("../middlewares/auth");

router.post("/tasks", auth, taskController.addTask);
router.get("/tasks", auth, taskController.getTasks);
router.put("/tasks", auth, taskController.updateTask);

module.exports = router;
