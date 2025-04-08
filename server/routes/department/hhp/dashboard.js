import express from "express";
import HHPDashboardTable from "../../../controllers/department/hhp/dashboard/table.js";
const router = express.Router();

router.get("/", HHPDashboardTable);

export { router };
