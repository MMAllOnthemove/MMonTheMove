const pool = require("../../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Delete job by id
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query(
      "DELETE FROM parts_department WHERE id = $1",
      [id]
    );
    if (res.status === 200 || res.status === 201) {
      res.send("Deleted successfully");
      res.send(deleteQuery.rows[0]);
    } else if (res.status === 404 || res.status === 405) {
      res.send("Failed to delete");
    }
  } catch (error) {
    // console.log(error);
  }
};

module.exports = {
  deleteJob,
};
