const pool = require("../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Get repair jobs
const getBookingAgentsJobs = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const newResults = await pool.query(
      "SELECT id, unique_id, (SELECT DISTINCT(service_order_no)) AS service_order_no, created_date, created_time, booking_agent, date_added, warranty from booking_agents_jobs"
    );
    res.json(newResults.rows);
  } catch (err) {
    // console.log(err);
  }
};

const postBookingAgentsJobs = async (req, res) => {
  let newResults;
  let isCached = false;
  const { serviceOrder, createdDate, createdTime, warranty, bookingAgent } =
    req.body;
  try {
    const findIfExists = await pool.query(
      "SELECT id from booking_agents_jobs where service_order_no = $1",
      [serviceOrder]
    );
    if (findIfExists.rowCount > 0) {
      res.status(400).json("Ticket already exists!");
      console.log("Cell exists");
    } else {
      const newResults = await pool.query(
        "INSERT INTO booking_agents_jobs (service_order_no, created_date, created_time, warranty, booking_agent) values ($1, $2, $3, $4, $5) returning *",
        [serviceOrder, createdDate, createdTime, warranty, bookingAgent]
      );
      res.status(200).json("Job added, thank you!");
    }
  } catch (err) {
    console.log("Create task error: ", err);
  }
};

module.exports = { getBookingAgentsJobs, postBookingAgentsJobs };