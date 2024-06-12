import express from "express";
const router = express.Router();

import createOTP from "../../../controllers/department/hhp/create_otp.js";
import getOTP from "../../../controllers/department/hhp/get_otp.js";
import { limiter } from "../../../middleware/rateLimiter.js";
import getAllOTP from "../../../controllers/department/hhp/get_all_otp.js";

router.post("/", limiter, createOTP);
router.get("/", getOTP);
router.get("/all", getAllOTP);

export { router };
