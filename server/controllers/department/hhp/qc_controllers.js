const express = require("express");
const pool = require("./../../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// QC CHECKED ALL JOBS
const qcEngineerJobs = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS qc_checked from units WHERE isqcchecked = true"
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

    res.json(newResults.rows);
  } catch (err) {
    // console.log(err);
  }
};

// QC CHECKED ALL JOBS TODAY
const qcEngineerJobsToday = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/today");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS qc_checked_today from units WHERE isqcchecked = true AND (DATE(date_modified) = CURRENT_DATE)"
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
  } catch (err) {
    // console.log(err);
  }
};

module.exports = { qcEngineerJobs, qcEngineerJobsToday };
