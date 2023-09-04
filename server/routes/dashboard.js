const express = require("express");
const router = express.Router();
const pool = require("../db");
const redis = require("redis");
const limiter = require("../controllers/rateLimiter");
const {
  countAllJobsIn,
  countAllJobsInToday,
  countAllJobsPendingToday,
  countAllPendingJobs,
  countAllCompleteJobs,
  countAllCompleteToday,
} = require("../controllers/analytics");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

router.get("/in/today", limiter, countAllJobsIn);
router.get("/in", limiter, countAllJobsInToday);
router.get("/pending/today", limiter, countAllJobsPendingToday);
router.get("/pending", limiter, countAllPendingJobs);
router.get("/complete/today", limiter, countAllCompleteToday);
router.get("/complete", limiter, countAllCompleteJobs);

module.exports = router;
