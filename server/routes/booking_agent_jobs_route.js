const express = require("express");
const router = express.Router();

const {
  getBookingAgentsJobs,
  postBookingAgentsJobs,
} = require("../controllers/booking_agents_jobs");

router.post("/booking-agents/jobs/add", postBookingAgentsJobs);
router.get("/booking-agents/jobs/get", getBookingAgentsJobs);

module.exports = router;
