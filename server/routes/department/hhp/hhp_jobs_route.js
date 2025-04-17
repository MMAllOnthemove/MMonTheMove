import express from "express";
import GetBinStats from "../../../controllers/department/hhp/bin_dashboard/get_stats.js";
import AddHHPTask from "../../../controllers/department/hhp/technicians/add_hhp_task.js";
import deleteHHPTask from "../../../controllers/department/hhp/technicians/delete_task.js";
import {
    GetAllTasks,
    GetTaskById,
    GetTaskByTicket,
} from "../../../controllers/department/hhp/technicians/get_tasks.js";
import { UpdateAssessmentDate } from "../../../controllers/department/hhp/technicians/update_assess_date.js";
import { UpdateSOAfterBooking } from "../../../controllers/department/hhp/technicians/update_so_after_booking.js";
import { UpdateTask } from "../../../controllers/department/hhp/technicians/update_task.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import { authenticateToken } from "../../../middleware/verify.js";
import { authenticateRole } from "../../../middleware/verify_role.js";
import { updateAssets } from "../../../controllers/department/hhp/technicians/update_assets.js";
import createHHPTicket from "../../../controllers/department/hhp/create_ticket/index.js";
import createTicketFromSO from "../../../controllers/department/hhp/create_ticket/create_ticket_from_so.js";
const router = express.Router();


router.post("/", limiter, authenticateToken, createHHPTicket);
router.post("/manually", limiter, authenticateToken, AddHHPTask);
router.post("/from_so", limiter, authenticateToken, createTicketFromSO);
router.patch("/assess/:id", limiter, authenticateToken, UpdateAssessmentDate);
router.put("/assets/:id", limiter, authenticateToken, updateAssets);

router.get("/", authenticateToken, GetAllTasks);
router.get("/:id", authenticateToken, GetTaskById);
router.get(
    "/engineer/bin",
    authenticateRole(["admin", "manager"]),
    GetBinStats
);
router.get("/ticket/:id", limiter, GetTaskByTicket);
router.patch("/:id", authenticateToken, UpdateTask);
router.patch("/so/:id", authenticateToken, UpdateSOAfterBooking);
router.delete("/:id", authenticateRole(["manager"]), deleteHHPTask);

export { router };
