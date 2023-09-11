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

// Filter by engineers

// Engineer Jobs fixed for today

router.get("/today", async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/today");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "select COUNT(DISTINCT service_order_no) AS units, engineer from units WHERE (DATE(date_modified) = CURRENT_DATE) GROUP BY engineer"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/today", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }
    res.json(newResults.rows);
    // res.send({
    //   fromCache: isCached,
    //   data: newResults.rows,
    // });
  } catch (err) {
    {
      //
    }
  }
});

// Engineer Jobs fixed for the past 30 days

router.get("/month", async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/month");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "select COUNT(DISTINCT service_order_no) AS units, engineer from units WHERE DATE(date_modified) >= date_trunc('month', CURRENT_TIMESTAMP - interval '1 month') GROUP BY engineer"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/month", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }

    res.json(newResults.rows);
    // res.send({
    //   fromCache: isCached,
    //   data: newResults.rows,
    // });
  } catch (err) {
    // console.log(err);
  }
});

// Engineer Jobs fixed for all time

router.get("/all-time", async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/all-time");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "select COUNT(DISTINCT service_order_no) AS units, engineer from units GROUP BY engineer"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/all-time", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }
    res.json(newResults.rows);
    // res.send({
    //   fromCache: isCached,
    //   data: newResults.rows,
    // });
  } catch (err) {
    // console.log(err);
  }
});

module.exports = router;
