const express = require("express");
const router = express.Router();
const {
  createTask,
} = require("../../../controllers/department/dtv/tasks/create_task");
const {
  getActiveTasks,
  getTaskById,
} = require("../../../controllers/department/dtv/tasks/get_tasks");
const {
  updateTaskById,
} = require("../../../controllers/department/dtv/tasks/update_task");
const {
  deleteTaskById,
} = require("../../../controllers/department/dtv/tasks/delete_task");

// Create task
router.post("/create", createTask);

// router.get("/get/all", getAllTasks); // off becasue we do not need so much info
router.get("/get", getActiveTasks); // get a select few info for news feed
router.get("/get/:id", getTaskById); // get a info for one job
router.put("/update/:id", updateTaskById); // get a info for one job
router.delete("/delete/:id", deleteTaskById);

module.exports = router;
