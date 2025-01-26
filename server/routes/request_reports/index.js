import express from "express";
import GetReport from "../../controllers/department/hhp/request_reports/get.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
const router = express.Router();
router.get("/", authenticateAdmin, GetReport);

export { router };

