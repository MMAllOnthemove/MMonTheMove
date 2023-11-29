const express = require("express");
const router = express.Router();
const pool = require("../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Post feedback to database
router.post("/", async (req, res) => {
  try {
    await pool.query("SELECT * FROM feedback ORDER BY date_created");
    // console.log(rows[0]);
  } catch (err) {
    // console.log(err);
  }
});

// Get feedback to database
router.get("/", async (req, res) => {
  let newResults;
  let isCached = false;
  const { issue_title, issue_body, userInfo } = req.body;
  try {
    const cacheResults = await redisClient.get("/");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "INSERT INTO feedback (issue_title, issue_body, posted_by_who) values ($1, $2, $3) returning *",
        [issue_title, issue_body, userInfo]
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }
    res.send({
      fromCache: isCached,
      data: newResults.rows,
    });
  } catch (err) {
    // console.log(err);
  }
});

module.exports = router;
