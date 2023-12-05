const express = require("express");
const router = express.Router();
const pool = require("../../../db");
const redis = require("redis");
const limiter = require("../../../middleware/rateLimiter");
const {
  countAllTimeCompleteJobsAllTime,
} = require("../../../controllers/department/hhp/analytics");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

router.get("/complete/all-time", limiter, countAllTimeCompleteJobsAllTime);

module.exports = router;
