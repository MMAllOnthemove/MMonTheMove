import express from "express";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";
import { authenticateAdmin } from "../../middleware/verify_admin.js";
import { authenticateRole } from "../../middleware/verify_role.js";
import createOTP from "../../controllers/otp/create.js";
import getOtp from "../../controllers/otp/get.js";

const router = express.Router();
router.get("/", authenticateToken, getOtp);
router.post("/", limiter, authenticateRole(["admin", "manager"]), createOTP);

export { router };
