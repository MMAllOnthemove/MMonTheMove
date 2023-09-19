const pool = require("../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const getJobsOnBookedinStatusForToday = async (req, res) => {
  try {
    const getQuery = await pool.query(
      "SELECT COUNT(DISTINCT service_order_no) as unit_status_booked_in_today from units WHERE in_house_status = 'Booked in'  AND date_modified::date = current_date"
    );
    res.json(getQuery.rows);
  } catch (error) {
    console.log("Jobs on Booked in for today error", error);
  }
};
const getJobsOnBookedinStatusForYesterday = async (req, res) => {
  try {
    const getQuery = await pool.query(
      "SELECT COUNT(DISTINCT service_order_no) as unit_status_booked_in_yesterday from units WHERE in_house_status = 'Booked in' AND date_modified::date = current_date - 1"
    );
    res.json(getQuery.rows);
  } catch (error) {
    console.log("Jobs on Booked in for yesterday error", error);
  }
};
