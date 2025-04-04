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
import { authenticateAdmin } from "../../../middleware/verify_admin.js";
import AddToQCTable from "../../../controllers/department/hhp/technicians/add_to_qc_table.js";
import { authenticateRole } from "../../../middleware/verify_role.js";
const router = express.Router();

router.post("/", limiter, authenticateToken, AddHHPTask);
router.patch("/assess/:id", limiter, authenticateToken, UpdateAssessmentDate);
router.post("/qc_table", AddToQCTable);
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
