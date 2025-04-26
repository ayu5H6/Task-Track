const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/authmiddleware");

router.post("/:projectId", auth, createTask);
router.get("/:projectId", auth, getTasks);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);

module.exports = router;
