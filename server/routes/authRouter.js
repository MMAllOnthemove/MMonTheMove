const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();
const rateLimiter = require("../controllers/rateLimiter");
const {
  attemptLogin,
  handleLogin,
  attemptSignup,
} = require("../controllers/authController");

router.route("/login").get(handleLogin).post(validateForm, rateLimiter(60, 10), attemptLogin);

router.post("/signup", validateForm,rateLimiter(30, 4), attemptSignup);
module.exports = router;
