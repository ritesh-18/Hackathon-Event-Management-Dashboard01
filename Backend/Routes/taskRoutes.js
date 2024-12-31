const express = require("express");
const {
  createTask,
  getTasks,
  updateTaskStatus,
  getAllTask
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask); // Create a task
router.get("/", getAllTask);
router.get("/:eventId", getTasks); // Get tasks for a specific event
router.put("/:id", updateTaskStatus); // Update a task status

module.exports = router;
