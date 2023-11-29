const express = require("express");
const router = express.Router();
const {
  qcEngineerJobs,
  qcEngineerJobsToday,
} = require("../controllers/qc_controllers");

// QC CHECKED ALL
router.get("/", qcEngineerJobs);

// QC CHECKED ALL TODAY
router.get("/today", qcEngineerJobsToday);

module.exports = router;
