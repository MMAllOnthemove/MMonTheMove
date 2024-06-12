import express from "express";
const router = express.Router();

import {
  PostRepairJobsHistory,
  GetAllJobsHistory,
  PostJobsHistory,
} from "../../controllers/history/hhp_jobs.js";

router.get("/history", GetAllJobsHistory);
router.post("/history", PostJobsHistory);
router.post("/repair/history", PostRepairJobsHistory);
export { router };
