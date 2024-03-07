import express from "express";
const router = express.Router();

import {
  PostRepairJobsHistory,
  GetAllJobsHistory,
  PostJobsHistory,
} from "../../controllers/history/hhp_jobs.js";

router.get("/units/history/get", GetAllJobsHistory);
router.post("/units/history/post", PostJobsHistory);
router.post("/repair/units/history/post", PostRepairJobsHistory);
export { router };
