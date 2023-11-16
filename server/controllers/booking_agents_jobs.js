const pool = require("../db");
const redis = require("redis");
const Yup = require("yup");

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
      "SELECT DISTINCT booking_agent, id, created_date, service_order_no from booking_agents_jobs"
    );
    res.json(newResults.rows);
  } catch (err) {
    // console.log(err);
  }
};

const postBookingAgentsJobs = async (req, res) => {
  let newResults;
  let isCached = false;
  const {
    serviceOrder,
    createdDate,
    createdTime,
    warranty,
    bookingAgent,
    userData,
  } = req.body;

  try {
    const findIfExists = await pool.query(
      "SELECT id from booking_agents_jobs where service_order_no = $1",
      [serviceOrder]
    );
    if (findIfExists.rowCount > 0 || bookingAgent === "") {
      res.status(400).json("Job already exists! or no agent name");
      // console.log("Cell exists or no agent name");
    } else {
      const newResults = await pool.query(
        "INSERT INTO booking_agents_jobs (service_order_no, created_date, created_time, warranty, booking_agent, added_by) values ($1, $2, $3, $4, $5, $6) returning *",
        [
          serviceOrder,
          createdDate,
          createdTime,
          warranty,
          bookingAgent,
          userData,
        ]
      );
      res.status(200).json("Job added, thank you!");
    }
  } catch (err) {
    console.log("Create task error: ", err);
  }
};

module.exports = { getBookingAgentsJobs, postBookingAgentsJobs };
