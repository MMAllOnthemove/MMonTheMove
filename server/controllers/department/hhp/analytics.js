import { pool } from "./../../../db.js";
import redis from "redis";

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Calculate total jobs
const CountAllTimeCompleteJobsAllTime = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/complete/all-time");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        // "SELECT COUNT(DISTINCT service_order_no) AS units_in FROM units"
        "select engineer, COUNT(DISTINCT service_order_no) AS units_added from units WHERE in_house_status = 'Repair complete' GROUP BY engineer ORDER BY units_added DESC"
      );
      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/complete/all-time", JSON.stringify(newResults), {
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
  } catch (err) {}
};

export default CountAllTimeCompleteJobsAllTime;
