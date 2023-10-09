const express = require("express");
const router = express.Router();

const {
  postPartsJobHistory,
  getPartsJobsHistory,
} = require("../../controllers/history/parts_dept");

router.get("/get", getPartsJobsHistory);
router.post("/post", postPartsJobHistory);
module.exports = router;
