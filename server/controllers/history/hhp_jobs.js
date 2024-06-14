import { pool } from "../../db.js";
import cron from "node-cron";

// Post repair jobs
const PostRepairJobsHistory = async (req, res) => {
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
    repairEngineerAnalysis,
    repairTicket,
    repairDepartment,
    repairUser,
    GSPNStatus,
    dateAdded,
  } = req.body;
  try {
    //  Here we do not check if job exists as we want history of every change
    await pool.query(
      "INSERT INTO units_history (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_analysis, ticket, department, job_added_by, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
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
        repairEngineerAnalysis,
        repairTicket,
        repairDepartment,
        repairUser,
        GSPNStatus,
        dateAdded,
      ]
    );
    res.status(201).json("Successfully created!");
  } catch (err) {}
};

// GET all table info from database
const GetAllJobsHistory = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, unique_id, (SELECT DISTINCT(service_order_no)) AS service_order_no, created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, in_house_status, engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, department, reassign_engineer, parts_list, UPPER(is_qc_checked::text) AS is_qc_checked, qc_comment, date_modified, gspn_status, date_added FROM units_history ORDER BY date_modified DESC"
    );
    res.json(rows);
  } catch (err) {}
};

// Post jobs to database
const PostJobsHistory = async (req, res) => {
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
    await pool.query(
      "INSERT INTO units_history (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, ticket, engineer_analysis, department, date_modified, job_added_by, modified_by_who, qc_comment, is_qc_checked, parts_list, gspn_status, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) returning *",
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

    res.status(201).json("Successfully created!");
  } catch (err) {}
};

export { PostRepairJobsHistory, GetAllJobsHistory, PostJobsHistory };
