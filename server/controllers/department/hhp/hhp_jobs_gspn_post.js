import axios from "axios";
import { pool } from "./../../../db.js";
import cron from "node-cron";
import "dotenv/config";
import * as Yup from "yup";

const hhpGSPNJobsSchema = Yup.object().shape({
  service_order: Yup.string()
    .min(10, "Service order is 10 digits!")
    .max(10, "Service order is 10 digits!")
    .required("Service Order is required!"),
  createdDate: Yup.string(),
  createdTime: Yup.string(),
  model: Yup.string().required("Model number is required!"),
  warranty: Yup.string().required("Warranty is required!"),
  engineer: Yup.string().required("Engineer is required!"),
  fault: Yup.string(),
  imei: Yup.string(),
  serial_number: Yup.string().required("Serial number is required!"),
  inHouseStatus: Yup.string().required("Select status!"),
  ticket: Yup.string().required("What is the ticket number?!"),
  department: Yup.string(),
  dateAdded: Yup.string(),
  user: Yup.string().email("Email is invalid!").required("Email is required!"),
});

// Post jobs to database
const PostJobs = async (req, res) => {
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
    engineerAnalysis,
    ticket,
    department,
    user,
    GSPNStatus,
    dateAdded,
  } = req.body;
  try {
    await hhpGSPNJobsSchema.validate(req.body);
    const findIfExists = await pool.query(
      "SELECT service_order_no from units WHERE service_order_no = $1",
      [service_order]
    );
    if (findIfExists.rows.length > 0) {
      // Checking the ticket input as it is the one where user puts in info
      res.status(400).send("Service order already exists!");
    } else {
      await pool.query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_analysis, ticket, department, job_added_by, gspn_status, date_added) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
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
          engineerAnalysis,
          ticket,
          department,
          user,
          GSPNStatus,
          dateAdded,
        ]
      );
      res.status(201).json("Successfully created!");
    }
  } catch (err) {
    console.log("hhp jobs error", err);
    res.status(500).json(err.message);
  }
};

export default PostJobs;
