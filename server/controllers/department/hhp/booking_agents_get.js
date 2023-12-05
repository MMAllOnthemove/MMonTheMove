const pool = require("./../../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Get repair jobs
const getBookingAgentsJobs = async (req, res) => {
  try {
    const newResults = await pool.query(
      "SELECT DISTINCT booking_agent, id, created_date, service_order_no from booking_agents_jobs"
    );
    res.json(newResults.rows);
  } catch (err) {
    // console.log(err);
  }
};

module.exports = { getBookingAgentsJobs };
