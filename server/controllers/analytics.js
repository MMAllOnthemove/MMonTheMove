const express = require("express");
const router = express.Router();
const pool = require("../db");
const redis = require("redis");
const limiter = require("../controllers/rateLimiter");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Calculate total jobs in today
const countAllJobsIn = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/in/today");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        // "SELECT COUNT(DISTINCT service_order_no) AS units_in FROM units"
        "select count(1) AS units_in_today from UNITS where (DATE(date_modified) = CURRENT_DATE)"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/in/today", JSON.stringify(newResults), {
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
    console.log(err);
  }
};

// Calculate total jobs in
const countAllJobsInToday = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/in");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        // "SELECT COUNT(DISTINCT service_order_no) AS units_in FROM units"
        "select count(1) AS units_in from UNITS"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/in", JSON.stringify(newResults), {
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
};
// Calculate total jobs pending today
const countAllJobsPendingToday = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/pending/today");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS pending_today FROM units WHERE (in_house_status != 'Repair complete' AND in_house_status != 'Booked in') AND (DATE(date_modified) = CURRENT_DATE)"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/pending/today", JSON.stringify(newResults), {
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
};
// Calculate pending jobs all time
const countAllPendingJobs = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/pending");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS pending FROM units WHERE (in_house_status != 'Repair complete' AND in_house_status != 'Booked in') "
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/pending", JSON.stringify(newResults), {
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
};

// Calculate complete jobs today
const countAllCompleteToday = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/complete/today");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS complete_today FROM units WHERE (in_house_status != 'Repair complete' AND in_house_status != 'Booked in') AND (DATE(date_modified) = CURRENT_DATE)"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/complete/today", JSON.stringify(newResults), {
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
    console.log(err);
  }
};

// Calculate complete jobs
const countAllCompleteJobs = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/complete");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS complete FROM units WHERE in_house_status = 'Repair complete'"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/complete", JSON.stringify(newResults), {
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
};

module.exports = {
  countAllJobsIn,
  countAllJobsInToday,
  countAllJobsPendingToday,
  countAllPendingJobs,
  countAllCompleteToday,
  countAllCompleteJobs,
};
