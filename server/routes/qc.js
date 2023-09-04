const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  qcEngineerJobs,
  qcEngineerJobsToday,
} = require("../controllers/qc_controllers");

// QC CHECKED ALL
router.get("/", qcEngineerJobs);

// QC CHECKED ALL TODAY
router.get("/today", qcEngineerJobsToday);

module.exports = router;
