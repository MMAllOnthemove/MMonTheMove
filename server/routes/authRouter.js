const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();
const { rateLimiter } = require("../controllers/rateLimiter");

const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controllers/authControllers");

router
  .route("/login")
  .get(handleLogin)
  .post(validateForm, rateLimiter(60, 10), attemptLogin);

router.post("/signup", validateForm, rateLimiter(30, 4), attemptRegister);
module.exports = router;
