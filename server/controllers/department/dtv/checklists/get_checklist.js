import { pool } from "../../../../db.js";
import redis from "redis";

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Get tasks
const GetChecklists = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/get");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      newResults = await pool.query(
        "SELECT checklist_id, unique_id, car, car_odometer, car_driver, driving_with, car_jack_check, car_spare_wheel_check, car_triangle_check,car_oil_check, car_water_check, car_tire_pressure_check, further_comments, checklist_created_by, DATE(date_added)::text AS date_added, driver_jobs.id FROM cars_checklist LEFT JOIN driver_jobs ON cars_checklist.job_id = driver_jobs.id"
      );

      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/get", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }

    res.json(newResults.rows);
  } catch (e) {
    console.log(e);
  }
};

export default GetChecklists;
