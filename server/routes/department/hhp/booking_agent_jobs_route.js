import express from "express";
const router = express.Router();

import GetBookingAgentsJobs from "../../../controllers/department/hhp/booking_agents_get.js";
import PostBookingAgentsJobs from "../../../controllers/department/hhp/booking_agents_post.js";

router.post("/booking-agents/jobs/add", PostBookingAgentsJobs);
router.get("/booking-agents/jobs/get", GetBookingAgentsJobs);

export { router };
