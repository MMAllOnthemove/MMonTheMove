import express from "express";
import GetReport from "../../controllers/department/hhp/request_reports/get.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import { authenticateRole } from "../../middleware/verify_role.js";
const router = express.Router();
router.get("/", authenticateRole(["admin", "manager"]), GetReport);

export { router };
