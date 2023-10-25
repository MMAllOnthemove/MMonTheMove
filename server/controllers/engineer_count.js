const pool = require("../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Count how many engineers

const getEngineerHeadCount = async (req, res) => {
  try {
    const newResults = await pool.query(
      "SELECT COUNT(DISTINCT engineer) as engineers_count, engineer FROM units GROUP BY engineer"
    );
    res.json(newResults.rows);
  } catch (error) {
    // console.log("Error counting engineers", error);
  }
};
module.exports = { getEngineerHeadCount };
