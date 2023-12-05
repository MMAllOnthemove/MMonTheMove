const pool = require("../../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const getPartsJobs = async (req, res) => {
  try {
    const newResults = await pool.query(
      "SELECT id, unique_id, service_order, warranty, model, imei, fault, serial_number, engineer, dispatch_analysis, in_house_status, ticket, department, dispatch_by, added_by, all_parts, TO_CHAR(job_added_date::date, 'YYYY-MM-DD') AS job_added_date, parts_checked, reason_for_incomplete_parts, DATE(job_modified_date) AS job_modified_date FROM parts_department ORDER BY job_added_date DESC"
    );
    res.json(newResults.rows);
  } catch (error) {
    // console.log(error);
  }
};

// get job by id
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM parts_department WHERE id = $1",
      [id]
    );
    res.json(rows);
  } catch (err) {
    // console.log(err);
  }
};

module.exports = {
  getPartsJobs,
  getJobById,
};
