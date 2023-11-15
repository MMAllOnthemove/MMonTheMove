const express = require("express");
const router = express.Router();
const userVerification = require("../../middleware/authorize");
const { logoutUser } = require("../../controllers/auth/logout");

const {
  registerUser,
  loginUser,
} = require("../../controllers/auth/register_login");

router.post("/signup", registerUser);
router.post("/login", loginUser);
// router.post("/verify", userVerification, verifyUser);
router.post("/", userVerification);
router.get("/logout", logoutUser);

module.exports = router;
