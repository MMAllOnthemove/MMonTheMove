const express = require("express");
const router = express.Router();

const {
  getBookingAgentsJobs,
} = require("../../../controllers/department/hhp/booking_agents_get");
const {
  postBookingAgentsJobs,
} = require("../../../controllers/department/hhp/booking_agents_post");

router.post("/booking-agents/jobs/add", postBookingAgentsJobs);
router.get("/booking-agents/jobs/get", getBookingAgentsJobs);

module.exports = router;
