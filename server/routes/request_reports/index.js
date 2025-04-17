import express from "express";
import getHHPTicketsReport from "../../controllers/department/hhp/request_reports/hhp_tickets.js";
import { authenticateRole } from "../../middleware/verify_role.js";
import getHHPTableDashboardReport from "../../controllers/department/hhp/request_reports/hhp_table_dashboard.js";
import getHHPBookingAgentsDashboardReport from "../../controllers/department/hhp/request_reports/hhp_booking_agents_dashboard_report.js";
const router = express.Router();
router.get("/", authenticateRole(["admin", "manager"]), getHHPTicketsReport);
router.get(
    "/dashboard/table",
    authenticateRole(["admin", "manager"]),
    getHHPTableDashboardReport
);
router.get(
    "/dashboard/booking_agents",
    authenticateRole(["admin", "manager"]),
    getHHPBookingAgentsDashboardReport
);

export { router };
