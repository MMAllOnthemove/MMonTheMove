const pool = require("../../db");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

// Post repair jobs
const postRepairJobsHistory = async (req, res) => {
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
    GSPNStatusGetLastElement,
    dateAdded,
  } = req.body;
  try {
    //  Here we do not check if job exists as we want history of every change
    const results = await pool.query(
      "INSERT INTO units_history (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *",
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
        GSPNStatusGetLastElement,
        dateAdded,
      ]
    );
    res.status(200).json("Job added, thank you!");
  } catch (err) {
    console.log("Create task error: ", err);
  }
};

// GET all table info from database
const getAllJobsHistory = async (req, res) => {
  let newResults;
  let isCached = false;
  try {
    const newResults = await pool.query(
      "SELECT id, unique_id, (SELECT DISTINCT(service_order_no)) AS service_order_no, created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, department, reassign_engineer, parts_list, UPPER(is_qc_checked::text) AS is_qc_checked, qc_comment, date_modified, gspn_status, date_added FROM units_history ORDER BY date_modified DESC"
    );
    res.json(newResults.rows);
  } catch (err) {
    console.log("getAllJobs", err);
  }
};

// Post jobs to database
const postJobsHistory = async (req, res) => {
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
    ticket,
    engineerAnalysis,
    department,
    dateModified,
    user,
    QCcomments,
    isQCchecked,
    partsArr,
    GSPNStatusGetLastElement,
    dateAdded,
  } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO units_history (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, ticket, engineer_analysis, department, date_modified, job_added_by, modified_by_who, qc_comment, is_qc_checked, parts_list, gspn_status, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) returning *",
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
        ticket,
        engineerAnalysis,
        department,
        dateModified,
        user,
        user,
        QCcomments,
        isQCchecked,
        partsArr,
        GSPNStatusGetLastElement,
        dateAdded,
      ]
    );

    res.status(201).json("Job added, thank you!");
  } catch (err) {
    console.log("Create task error: ", err);
  }
};

module.exports = {
  postRepairJobsHistory,
  getAllJobsHistory,
  postJobsHistory,
};
