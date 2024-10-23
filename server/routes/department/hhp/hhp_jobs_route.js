import express from "express";
import AddGSPNTask from "../../../controllers/department/hhp/admin/add_gspn_task.js";
import {
    GetAllTasks,
    GetTaskById,
} from "../../../controllers/department/hhp/technicians/get_tasks.js";
import { UpdateTask } from "../../../controllers/department/hhp/technicians/update_task.js";
const router = express.Router();

import { limiter } from "../../../middleware/rateLimiter.js";

router.post("/", limiter, AddGSPNTask);
router.get("/", GetAllTasks);
router.get("/:id", GetTaskById);
router.patch("/:id", UpdateTask);

export { router };
