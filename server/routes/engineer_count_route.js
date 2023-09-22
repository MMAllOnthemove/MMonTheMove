const express = require("express");
const router = express.Router();

const { getEngineerHeadCount } = require("../controllers/engineer_count");

router.get("/count", getEngineerHeadCount);
module.exports = router;
