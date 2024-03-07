import express from "express";
const router = express.Router();
import { limiter } from "../../../middleware/rateLimiter.js";
import CountAllTimeCompleteJobsAllTime from "../../../controllers/department/hhp/analytics.js";

router.get("/complete/all-time", limiter, CountAllTimeCompleteJobsAllTime);

export { router };
