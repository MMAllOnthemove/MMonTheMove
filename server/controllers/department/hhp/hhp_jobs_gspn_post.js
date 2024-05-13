import { pool } from "./../../../db.js";

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
    if (findIfExists.rows.length > 0) {
      // Checking the ticket input as it is the one where user puts in info
      res.status(400).send("Service order already exists!");
    } else if (
      service_order.length < 10 ||
      service_order.length < 0 ||
      service_order.length === 0
    ) {
      res.status(400).send("Service order must be 10 characters long!");
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
  } catch (err) {}
};

export default PostJobs;
