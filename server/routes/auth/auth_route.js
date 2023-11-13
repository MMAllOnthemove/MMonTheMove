const express = require("express");
const router = express.Router();
const authorize = require("../../middleware/authorize");

const {
  registerUser,
  loginUser,
  verifyUser,
} = require("../../controllers/auth/register_login");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verify", authorize, verifyUser);

module.exports = router;
