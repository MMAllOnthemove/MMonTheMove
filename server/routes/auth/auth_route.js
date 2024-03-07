import express from "express";
const router = express.Router();
import UserVerification from "../../middleware/authorize.js";
import LogoutUser from "../../controllers/auth/logout.js";
import { limiter } from "../../middleware/rateLimiter.js";
import SignupUser from "../../controllers/auth/signup.js";
import LoginUser from "../../controllers/auth/login.js";

router.post("/signup", limiter, SignupUser);
router.post("/login", limiter, LoginUser);
router.post("/me", UserVerification);
router.get("/logout", LogoutUser);

export { router };
