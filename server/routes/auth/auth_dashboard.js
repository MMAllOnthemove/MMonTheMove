const express = require("express");
const router = express.Router();
const verifyUserDashboard = require("../../controllers/auth/dashboard");
const authorize = require("../../middleware/authorize");

router.post("/", authorize, verifyUserDashboard);

module.exports = router;
