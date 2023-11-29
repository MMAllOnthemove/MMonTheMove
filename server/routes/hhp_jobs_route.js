const express = require("express");
const router = express.Router();
const {
  postRepairJobs,
  getAllJobs,
  getJobById,
  postJobs,
  updateJob,
  updateJobclaimsGSPNStatus,
  deleteJob,
} = require("../controllers/hhp_jobs");
const limiter = require("../controllers/rateLimiter");

// Get repair information
// It's at the top because we get an error when it is at the bottom
// router.get("/repair", getRepairJobs);

// Post repair information
router.post("/repair", limiter, postRepairJobs);

// GET all table info from database
router.get("/", getAllJobs);

// GET one row table info from database

router.get("/:id", getJobById);

// POST all table info to database
router.post("/", limiter, postJobs);

// Update single row on database
// Using COALESCE to prevent null values when updating
router.put("/:id", limiter, updateJob);
router.put("/claims/:id", limiter, updateJobclaimsGSPNStatus);

// Delete single row on database
router.delete("/:id", deleteJob);

module.exports = router;
