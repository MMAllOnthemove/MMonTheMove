const pool = require("../../../../db");

const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const getActiveTasks = async (req, res) => {
  let newResults;
  let isCached = false;

  try {
    const newResults = await pool.query(
      "SELECT driver_jobs.id, job_unique_id, engineer, job_status::TEXT AS job_status, CONCAT(customer_first_name, ' ', customer_last_name) AS \"full_name\", CONCAT(customer_street_address, ' ', customer_street_address_two, ' ', customer_city, ' ', customer_province) AS \"customer_address\", customer_email, CONCAT(customer_homephone, ' - ', customer_mobilephone) AS \"customer_contact_info\", service_order_no, fault, ticket,ticket_number_id, parts_list, DATE(added_on)::TEXT AS added_on, cars_checklist.car_driver, cars_checklist.checklist_id, engineer_phone_number FROM driver_jobs LEFT JOIN CARS_CHECKLIST ON driver_jobs.id = CARS_CHECKLIST.checklist_id WHERE driver_jobs.job_status = true"
    );

    res.json(newResults.rows);
  } catch (e) {
    // console.log("newResults.rows", newResults.rows);
    console.log(e);
  }
};

const getTaskById = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get("/get/:id");
    if (cacheResults) {
      isCached = true;
      newResults = JSON.parse(cacheResults);
    } else {
      const { id } = req.params;
      newResults = await pool.query("SELECT * from driver_jobs WHERE id = $1", [
        id,
      ]);

      if (newResults.length === 0) {
        throw "API returned an empty array";
      }
      // To store the data in the Redis cache, you need to use the node-redis module’s set() method to save it.
      await redisClient.set("/get/:id", JSON.stringify(newResults), {
        // EX is the cache expiring time and NX ensures that the set() method should only set a key that doesn’t already exist in Redis.
        // In our case it expires after 30 seconds
        EX: 30,
        NX: true,
      });
    }

    res.json(newResults.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getActiveTasks, getTaskById };
