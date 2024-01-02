import express from "express";
const router = express.Router();
import {
  QCEngineerJobs,
  QCEngineerJobsToday,
} from "../../../controllers/department/hhp/qc_controllers.js";

// QC CHECKED ALL
router.get("/", QCEngineerJobs);

// QC CHECKED ALL TODAY
router.get("/today", QCEngineerJobsToday);

export { router };
