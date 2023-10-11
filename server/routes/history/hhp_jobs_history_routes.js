const express = require("express");
const router = express.Router();
const {
  postRepairJobsHistory,
  getAllJobsHistory,
  postJobsHistory,
} = require("../../controllers/history/hhp_jobs");

router.get("/units/history/get", getAllJobsHistory);
router.post("/units/history/post", postJobsHistory);
router.post("/repair/units/history/post", postRepairJobsHistory);
module.exports = router;
