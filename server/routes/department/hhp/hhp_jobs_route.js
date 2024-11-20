import express from "express";
import AddHHPTask from "../../../controllers/department/hhp/admin/add_hhp_task.js";
import {
    GetAllTasks,
    GetTaskById,
} from "../../../controllers/department/hhp/technicians/get_tasks.js";
import { UpdateTask } from "../../../controllers/department/hhp/technicians/update_task.js";
const router = express.Router();
import { UpdateAssessmentDate } from "../../../controllers/department/hhp/technicians/update_assess_date.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateToken } from "../../../middleware/verify.js";

router.post("/", limiter, authenticateToken, AddHHPTask);
router.patch("/assess/:id", limiter, authenticateToken, UpdateAssessmentDate);
router.get("/", authenticateToken, GetAllTasks);
router.get("/:id", authenticateToken, GetTaskById);
router.patch("/:id", authenticateToken, UpdateTask);

export { router };
