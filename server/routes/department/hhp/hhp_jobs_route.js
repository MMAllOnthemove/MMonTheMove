import express from "express";
import {
  GetAllJobs,
  GetJobById,
} from "../../../controllers/department/hhp/hhp_jobs_get.js";
import PostJobs from "../../../controllers/department/hhp/hhp_jobs_gspn_post.js";
import PostRepairJobs from "../../../controllers/department/hhp/hhp_jobs_repair_post.js";
import {
  UpdateJob,
  UpdateJobclaimsGSPNStatus,
} from "../../../controllers/department/hhp/hhp_jobs_update.js";
const router = express.Router();

import DeleteJob from "../../../controllers/department/hhp/hhp_jobs_delete.js";

import { limiter } from "../../../middleware/rateLimiter.js";

// Get repair information
// It's at the top because we get an error when it is at the bottom
// router.get("/repair", getRepairJobs);

// Post repair information
router.post("/repair", limiter, PostRepairJobs);

// GET all table info from database
router.get("/", GetAllJobs);

// GET one row table info from database

router.get("/:id", GetJobById);

// POST all table info to database
router.post("/", limiter, PostJobs);

// Update single row on database
// Using COALESCE to prevent null values when updating
router.put("/:id", limiter, UpdateJob);
router.put("/claims/:id", UpdateJobclaimsGSPNStatus);

// Delete single row on database
router.delete("/:id", DeleteJob);

export { router };
