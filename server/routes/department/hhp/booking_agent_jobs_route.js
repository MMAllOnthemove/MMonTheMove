import express from "express";
const router = express.Router();

import GetBookingAgentsJobs from "../../../controllers/department/hhp/booking_agents_get.js";
import PostBookingAgentsJobs from "../../../controllers/department/hhp/booking_agents_post.js";

router.post("/", PostBookingAgentsJobs);
router.get("/", GetBookingAgentsJobs);

export { router };
