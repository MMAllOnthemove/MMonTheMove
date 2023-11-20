const express = require("express");
const router = express.Router();
const userVerification = require("../../middleware/authorize");
const { logoutUser } = require("../../controllers/auth/logout");
const limiter = require("../../middleware/rateLimiter");

const registerUser = require("../../controllers/auth/register");
const loginUser = require("../../controllers/auth/login");

router.post("/signup", limiter, registerUser);
router.post("/login", limiter, loginUser);
router.post("/", userVerification);
router.get("/logout", logoutUser);

module.exports = router;
