const pool = require("../../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Update job by id
// get job by id
const updateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { dispatchAnalysis, inHouseStatus, dateModified, dispatchBy } =
      req.body;
    const editQuery = await pool.query(
      "UPDATE parts_department SET dispatch_analysis = $1, in_house_status = $2, job_modified_date = $3, modified_by_who = $4, WHERE id = $5 returning *",
      [dispatchAnalysis, inHouseStatus, dateModified, dispatchBy, id]
    );
    // console.log(editQuery.rows);
    res.json(editQuery.rows);
  } catch (err) {
    // console.log(err);
  }
};

module.exports = {
  updateJobById,
};
