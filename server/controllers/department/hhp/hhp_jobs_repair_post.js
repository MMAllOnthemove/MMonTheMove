import { pool } from "./../../../db.js";
import "dotenv/config";
import * as Yup from "yup";

const hhpRepairJobsSchema = Yup.object({
  repairCreatedDate: Yup.string(),
  repairModel: Yup.string().required("Model number is required!"),
  repairWarranty: Yup.string().required("Warranty is required!"),
  repairEngineer: Yup.string().required("Engineer is required!"),
  repairFault: Yup.string(),
  repairImei: Yup.string(),
  repairSerialNumber: Yup.string().required("Serial number is required!"),
  repairInHouseStatus: Yup.string().required("Select status!"),
  repairTicket: Yup.string().required("What is the ticket number?!"),
  repairDepartment: Yup.string(),
  dateAdded: Yup.string(),
  repairUser: Yup.string()
    .email("Email is invalid!")
    .required("Email is required!"),
});

// Post repair jobs
const PostRepairJobs = async (req, res) => {
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
    repairEngineerAnalysis,
    repairTicket,
    repairDepartment,
    repairUser,
    dateAdded,
  } = req.body;
  try {
    const findIfExists = await pool.query(
      "SELECT id from units WHERE ticket = $1",
      [repairTicket]
    );
    if (findIfExists.rows.length > 0) {
      res.status(400).json("Ticket already exists!");
    } else {
      await pool.query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_analysis, ticket, department, job_added_by, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
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
          repairEngineerAnalysis,
          repairTicket,
          repairDepartment,
          repairUser,
          dateAdded,
        ]
      );
      res.status(201).json("Successfully created!");
    }
  } catch (err) {
    console.log("RS jobs error", err);
    res.status(500).json(err.message);
  }
};
export default PostRepairJobs;
