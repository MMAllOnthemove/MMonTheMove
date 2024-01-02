import express from "express";
const router = express.Router();

import CreateTask from "../../../controllers/department/dtv/tasks/create_task.js";
import {
  GetActiveTasks,
  GetTaskById,
} from "../../../controllers/department/dtv/tasks/get_tasks.js";
import UpdateTaskById from "../../../controllers/department/dtv/tasks/update_task.js";
import DeleteTaskById from "../../../controllers/department/dtv/tasks/delete_task.js";

// Create task
router.post("/create", CreateTask);

// router.get("/get/all", getAllTasks); // off becasue we do not need so much info
router.get("/get", GetActiveTasks); // get a select few info for news feed
router.get("/get/:id", GetTaskById); // get a info for one job
router.put("/update/:id", UpdateTaskById); // get a info for one job
router.delete("/delete/:id", DeleteTaskById);
export { router };
