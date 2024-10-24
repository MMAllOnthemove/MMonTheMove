import express from "express";
import AddGSPNTask from "../../../controllers/department/hhp/admin/add_gspn_task.js";
import {
    GetAllTasks,
    GetTaskById,
} from "../../../controllers/department/hhp/technicians/get_tasks.js";
import { UpdateTask } from "../../../controllers/department/hhp/technicians/update_task.js";
const router = express.Router();

import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateAdmin } from "../../../middleware/verify_admin.js";
import { authenticateToken } from "../../../middleware/verify.js";

router.post("/", limiter, authenticateAdmin, AddGSPNTask);
router.get("/", authenticateToken, GetAllTasks);
router.get("/:id", authenticateToken, GetTaskById);
router.patch("/:id", authenticateToken, UpdateTask);

export { router };
