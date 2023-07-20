const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(sessionMiddleware);
app.set("trust proxy", 1);

// GET all table info from database
app.get(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, unique_id, service_order_no, to_char(to_timestamp(created_date, 'YYYYMMDD'),'YYYY-MM-DD') AS created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, INITCAP(in_house_status) AS in_house_status, to_char(to_timestamp(engineer_assign_date, 'YYYYMMDD'),'YYYY-MM-DD') AS engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department FROM units ORDER BY date_modified DESC"
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

// GET one row table info from database
app.get(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_EDIT, async (req, res) => {
  try {
    const { id } = req.params;
    const dbData = await pool.query("SELECT * FROM units WHERE id = $1", [id]);
    res.json(dbData.rows);
  } catch (err) {
    console.log(err);
  }
});

// POST all table info to database
app.post(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, async (req, res) => {
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
  } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
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
      ]
    );
    res.status(400).send("Bad Request");

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update single row on database
// Using COALESCE to prevent null values when updating
app.put(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_EDIT, async (req, res) => {
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
      user,
    } = req.body;
    const editQuery = await pool.query(
      "UPDATE units SET engineer_analysis = $1, in_house_status = $2, parts_pending_date = $3, parts_ordered_date = $4, parts_issued_date = $5, qc_completed_date = $6, repair_completed_date = $7, ticket = $8, modified_by_who = $9 WHERE id = $10 returning *",
      [
        engineerAnalysis,
        inHouseStatus,
        partsPendingDate,
        partsOrderedDate,
        partsIssuedDate,
        qcCompletedDate,
        repairCompletedDate,
        ticket,
        user,
        id,
      ]
    );
    if (res.status === 200 || res.status === 201) {
      res.send("Updated successfully");
      res.send(editQuery.rows);
    } else if (res.status === 404 || res.status === 405) {
      res.send("Failed to update");
    }
    // console.log(editQuery.rows);
  } catch (error) {
    console.log(error);
  }
});

// Delete single row on database
app.delete(
  process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_EDIT,
  async (req, res) => {
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
      console.log(error);
    }
  }
);

// Post feedback to database
app.post(
  process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_FEEDBACK,
  async (req, res) => {
    const { issue_title, issue_body, userInfo } = req.body;
    try {
      const results = await pool.query(
        "INSERT INTO feedback (issue_title, issue_body, posted_by_who) values ($1, $2, $3) returning *",
        [issue_title, issue_body, userInfo]
      );
      // console.log(results);
      res.status(201).json({
        status: "success",
        data: {
          restaurant: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// Dashboard begins here

// Calculate total jobs in
// DISTINCT to filter out any duplicates

app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/in`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT COUNT(DISTINCT service_order_no) AS units_in FROM units"
      );
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);
app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/pending`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS pending FROM units WHERE NOT in_house_status = 'Booked in'"
      );
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);
app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS complete FROM units WHERE in_house_status = 'Repair complete'"
      );
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is up and listening on port localhost:${PORT}`);
});
module.exports = pool;
