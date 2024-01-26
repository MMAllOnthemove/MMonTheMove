import express from "express";
const router = express.Router();

import createOTP from "../../../controllers/department/hhp/create_otp.js";
import getOTP from "../../../controllers/department/hhp/get_otp.js";
import { limiter } from "../../../middleware/rateLimiter.js";

router.post("/post", limiter, createOTP);
router.get("/get", getOTP);

export { router };
