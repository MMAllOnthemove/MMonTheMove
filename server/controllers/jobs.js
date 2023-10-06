const pool = require("../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Get repair jobs
// const getRepairJobs = async (req, res) => {
//   let newResults;
//   let isCached = false;
//   try {
//     const newResults = await pool.query(
//       "SELECT id, unique_id,  (SELECT DISTINCT(service_order_no)) AS service_order_no, created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, TO_CHAR(date_modified, 'YYYY-MM-DD') AS date_modified, gspn_status FROM units ORDER BY date_modified DESC"
//     );
//     res.json(newResults.rows);
//   } catch (err) {
//     // console.log(err);
//   }
// };

// Post repair jobs
const postRepairJobs = async (req, res) => {
  const {
    repairServiceOrder,
    repairCreatedDate,
    repairCreatedTime,
    repairModel,
    repairWarranty,
    repairEngineer,
    repairFault,
    repairImei,
    repairSerialNumber,
    repairInHouseStatus,
    repairEngineerAssignDate,
    repairEngineerAssignTime,
    repairEngineerAnalysis,
    repairTicket,
    repairDepartment,
    repairUser,
  } = req.body;
  try {
    const findIfExists = await pool.query(
      "SELECT id from units WHERE ticket = $1",
      [repairTicket]
    );
    if (findIfExists.rowCount > 0) {
      res.status(400).json("Ticket already exists!");
      console.log("Cell exists");
    } else {
      const results = await pool.query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
        [
          repairServiceOrder,
          repairCreatedDate,
          repairCreatedTime,
          repairModel,
          repairWarranty,
          repairEngineer,
          repairFault,
          repairImei,
          repairSerialNumber,
          repairInHouseStatus,
          repairEngineerAssignDate,
          repairEngineerAssignTime,
          repairEngineerAnalysis,
          repairTicket,
          repairDepartment,
          repairUser,
        ]
      );
      res.status(200).json("Job added, thank you!");
    }
  } catch (err) {
    console.log("Create task error: ", err);
  }
};

// GET all table info from database
const getAllJobs = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const newResults = await pool.query(
      "SELECT id, unique_id, (SELECT DISTINCT(service_order_no)) AS service_order_no, created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, TO_CHAR(date_modified, 'YYYY-MM-DD') AS date_modified, gspn_status FROM units ORDER BY date_modified DESC"
    );
    res.json(newResults.rows);
  } catch (err) {
    // console.log(err);
  }
};

// get job by id
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM units WHERE id = $1", [
      id,
    ]);
    res.json(rows);
  } catch (err) {
    // console.log(err);
  }
};

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
  } = req.body;
  try {
    const findIfExists = await pool.query(
      "SELECT id from units WHERE service_order_no = $1",
      [service_order]
    );
    if (findIfExists.rowCount > 0) {
      // Checking the ticket input as it is the one where user puts in info
      res.status(400).json("Service order already exists!");
      console.log("Cell exists");
    } else {
      const results = await pool.query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by, gspn_status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *",
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
        ]
      );

      res.status(201).json("Job added, thank you!");
    }
  } catch (err) {
    console.log("Create task error: ", err);
  }
};

// Update job by id

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      engineerAnalysis,
      inHouseStatus,
      partsPendingDate,
      partsOrderedDate,
      partsIssuedDate,
      qcCompletedDate,
      repairCompletedDate,
      ticket,
      reassignEngineer,
      isQCchecked,
      QCcomments,
      partsArr,
      user,
      GSPNStatusGetLastElement,
    } = req.body;
    const editQuery = await pool
      .query(
        "UPDATE units SET engineer_analysis = $1, in_house_status = $2, parts_pending_date = $3, parts_ordered_date = $4, parts_issued_date = $5, qc_completed_date = $6, repair_completed_date = $7, ticket = $8, reassignengineer = $9, isqcchecked = $10, qc_comment = $11, partslist = $12, modified_by_who = $13, gspn_status = $14 WHERE id = $15 returning *",
        [
          engineerAnalysis,
          inHouseStatus,
          partsPendingDate,
          partsOrderedDate,
          partsIssuedDate,
          qcCompletedDate,
          repairCompletedDate,
          ticket,
          reassignEngineer,
          isQCchecked,
          QCcomments,
          partsArr,
          user,
          GSPNStatusGetLastElement,
          id,
        ]
      )
      .catch((e) => console.log("err", e));
    res.send(editQuery.rows);
  } catch (error) {
    // console.log(error);
  }
};

// Update only one job gspn status
const updateJobclaimsGSPNStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { claimsGSPNStatus } = req.body;
    const editQuery = await pool
      .query("UPDATE units SET gspn_status = $1  WHERE id = $2 returning *", [
        claimsGSPNStatus,
        id,
      ])
      .catch((e) => console.log("claimsGSPNStatus err", e));
    res.send(editQuery.rows);
  } catch (error) {
    // console.log(error);
  }
};

// Delete job by id
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query("DELETE FROM units WHERE id = $1", [
      id,
    ]);
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
  postRepairJobs,
  getAllJobs,
  getJobById,
  postJobs,
  updateJob,
  updateJobclaimsGSPNStatus,
  deleteJob,
};
