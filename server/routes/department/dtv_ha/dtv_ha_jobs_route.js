import express from "express";
import AddDTVHATask from "../../../controllers/department/dtv_ha/technicians/add_dtv_ha_task.js";
import {
    GetAllTasks,
    GetTaskById,
} from "../../../controllers/department/dtv_ha/technicians/get_tasks.js";
import { UpdateTask } from "../../../controllers/department/dtv_ha/technicians/update_task.js";
const router = express.Router();
import { UpdateAssessmentDate } from "../../../controllers/department/dtv_ha/technicians/update_assess_date.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateToken } from "../../../middleware/verify.js";

router.post("/", limiter, authenticateToken, AddDTVHATask);
router.patch("/assess/:id", limiter, authenticateToken, UpdateAssessmentDate);
router.get("/", authenticateToken, GetAllTasks);
router.get("/:id", authenticateToken, GetTaskById);
router.patch("/:id", authenticateToken, UpdateTask);

export { router };
