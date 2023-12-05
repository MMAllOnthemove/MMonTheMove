const pool = require("./../../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Post jobs to database
const postJobs = async (req, res) => {
  const {
    service_order,
    createdDate,
    createdTime,
    model,
    warranty,
    engineer,
    fault,
    imei,
    serial_number,
    inHouseStatus,
    engineerAssignDate,
    engineerAssignTime,
    engineerAnalysis,
    ticket,
    department,
    user,
    GSPNStatusGetLastElement,
    dateAdded,
  } = req.body;
  try {
    const findIfExists = await pool.query(
      "SELECT service_order_no from units WHERE service_order_no = $1",
      [service_order]
    );
    if (findIfExists.rowCount > 0) {
      // Checking the ticket input as it is the one where user puts in info
      res.status(400).json("Service order already exists!");
      console.log("Cell exists");
    } else {
      await pool.query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by, gspn_status, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) returning *",
        [
          service_order,
          createdDate,
          createdTime,
          model,
          warranty,
          engineer,
          fault,
          imei,
          serial_number,
          inHouseStatus,
          engineerAssignDate,
          engineerAssignTime,
          engineerAnalysis,
          ticket,
          department,
          user,
          GSPNStatusGetLastElement,
          dateAdded,
        ]
      );
      res.status(201).json("Job added, thank you!");
    }
  } catch (err) {
    console.log("Create task error: ", err);
  }
};

module.exports = {
  postJobs,
};
