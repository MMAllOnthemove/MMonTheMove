const express = require("express");
const router = express.Router();

const {
  getEngineerHeadCount,
} = require("../../../controllers/department/hhp/engineer_count");

router.get("/count", getEngineerHeadCount);
module.exports = router;
