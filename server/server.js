const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const pool = require("./db");
const limiter = require("../server/controllers/rateLimiter");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.NEXT_PUBLIC_MAIN_DOMAIN,
      process.env.NEXT_PRODUCTION_SUBDOMAIN_REGEX,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(sessionMiddleware);
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");
// app.use(limiter);

// Get repair information
// It's at the top because we get an error when it is at the bottom
app.get(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_REPAIR, async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT id, unique_id, service_order_no, to_char(DATE(created_date), 'YYYY-MM-DD') AS created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, INITCAP(in_house_status) AS in_house_status, to_char(DATE(engineer_assign_date), 'YYYY-MM-DD') AS engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, date_modified FROM units ORDER BY date_modified DESC"
    );
    res.json(results.rows);
  } catch (err) {
    console.log(err);
  }
});

// Post repair information

app.post(
  process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_REPAIR,
  async (req, res) => {
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
      user,
    } = req.body;
    try {
      const results = await pool
        .query(
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
            user,
          ]
        )
        .catch((e) => console.log("post error", e));

      res.status(201).json({
        status: "success",
        data: {
          restaurant: results.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// GET all table info from database
app.get(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, unique_id, service_order_no, to_char(to_timestamp(created_date, 'YYYYMMDD'),'YYYY-MM-DD') AS created_date, model, warranty, engineer, UPPER(fault) AS fault, imei, serial_number, INITCAP(in_house_status) AS in_house_status, to_char(to_timestamp(engineer_assign_date, 'YYYYMMDD'),'YYYY-MM-DD') AS engineer_assign_date, ticket, UPPER(engineer_analysis) AS engineer_analysis, parts_ordered_date, parts_pending_date, parts_issued_date, qc_completed_date, repair_completed_date, department, reassignengineer, partslist, UPPER(isqcchecked::text) AS isqcchecked, qc_comment, date_modified FROM units ORDER BY date_modified DESC"
    );
    res.json(rows);
  } catch (err) {
    // console.log(err);
  }
});

// GET one row table info from database
app.get(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_EDIT, async (req, res) => {
  try {
    const { id } = req.params;
    const dbData = await pool.query("SELECT * FROM units WHERE id = $1", [id]);
    res.json(dbData.rows);
  } catch (err) {
    // console.log(err);
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
    const results = await pool
      .query(
        "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket, department, job_added_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
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
      )
      .catch((e) => console.log("post error", e));
    res.status(400).send("Bad Request");

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    // console.log(err);
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
      reassignEngineer,
      isQCchecked,
      QCcomments,
      partsArr,
      user,
    } = req.body;
    const editQuery = await pool.query(
      "UPDATE units SET engineer_analysis = $1, in_house_status = $2, parts_pending_date = $3, parts_ordered_date = $4, parts_issued_date = $5, qc_completed_date = $6, repair_completed_date = $7, ticket = $8, reassignengineer = $9, isqcchecked = $10, qc_comment = $11, partslist = $12, modified_by_who = $13 WHERE id = $14 returning *",
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
    // console.log(error);
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
      // console.log(error);
    }
  }
);

// Post feedback to database
app.post(
  process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_FEEDBACK,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM feedback ORDER BY date_created"
      );
      // console.log(rows[0]);
    } catch (err) {
      // console.log(err);
    }
  }
);
// Get feedback to database
app.get(
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
      // console.log(err);
    }
  }
);

// Dashboard begins here

// Calculate total jobs in
// DISTINCT to filter out any duplicates

app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/in/today`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        // "SELECT COUNT(DISTINCT service_order_no) AS units_in FROM units"
        "select count(1) AS units_in_today from UNITS where (DATE(date_modified) = CURRENT_DATE)"
      );
      res.json(rows[0]);
    } catch (err) {
      // console.log(err);
    }
  }
);
app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/in`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        // "SELECT COUNT(DISTINCT service_order_no) AS units_in FROM units"
        "select count(1) AS units_in from UNITS"
      );
      res.json(rows[0]);
    } catch (err) {
      // console.log(err);
    }
  }
);

app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/pending/today`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS pending_today FROM units WHERE (in_house_status != 'Repair complete' AND in_house_status != 'Booked in') AND (DATE(date_modified) = CURRENT_DATE)"
      );
      res.json(rows[0]);
    } catch (err) {
      // console.log(err);
    }
  }
);

app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/pending`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS pending FROM units WHERE (in_house_status != 'Repair complete' AND in_house_status != 'Booked in') "
      );
      res.json(rows[0]);
    } catch (err) {
      // console.log(err);
    }
  }
);
app.get(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete/today`,
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT count(DISTINCT service_order_no) AS complete_today FROM units WHERE (in_house_status != 'Repair complete' AND in_house_status != 'Booked in') AND (DATE(date_modified) = CURRENT_DATE)"
      );

      res.json(rows[0]);
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

      res.json(rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

// Filter by engineers

// Engineer Jobs fixed for today

app.get(
  `${process.env.NEXT_PUBLIC_SERVER_ENGINEER_JOBS_COUNT_OVERVIEW}/today`,
  async (req, res) => {
    try {
      const { rows } = await pool
        .query(
          "select COUNT(DISTINCT service_order_no) AS units, engineer from units WHERE (DATE(date_modified) = CURRENT_DATE) GROUP BY engineer"
        )
        .catch((e) => console.log("today overview error", e));

      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);

// Engineer Jobs fixed for the past 30 days

app.get(
  `${process.env.NEXT_PUBLIC_SERVER_ENGINEER_JOBS_COUNT_OVERVIEW}/month`,
  async (req, res) => {
    try {
      const { rows } = await pool
        .query(
          "select COUNT(DISTINCT service_order_no) AS units, engineer from units WHERE DATE(date_modified) >= date_trunc('month', CURRENT_TIMESTAMP - interval '1 month') GROUP BY engineer"
        )
        .catch((e) => console.log("Month overview error", e));

      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);

// Engineer Jobs fixed for all time

app.get(
  `${process.env.NEXT_PUBLIC_SERVER_ENGINEER_JOBS_COUNT_OVERVIEW}/all-time`,
  async (req, res) => {
    try {
      const { rows } = await pool
        .query(
          "select COUNT(DISTINCT service_order_no) AS units, engineer from units GROUP BY engineer"
        )
        .catch((e) => console.log("alltime overview error", e));

      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);

// QC CHECKED ALL TODAY
app.get(
  `${process.env.NEXT_PUBLIC_SERVER_QC_CHECKED_JOBS_COUNT_OVERVIEW}`,
  async (req, res) => {
    try {
      const { rows } = await pool
        .query(
          "SELECT count(DISTINCT service_order_no) AS qc_checked from units WHERE isqcchecked = true"
        )
        .catch((e) => console.log("qc all time overview error", e));

      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);

// QC CHECKED ALL TODAY
app.get(
  `${process.env.NEXT_PUBLIC_SERVER_QC_CHECKED_JOBS_COUNT_OVERVIEW}/today`,
  async (req, res) => {
    try {
      const { rows } = await pool
        .query(
          "SELECT count(DISTINCT service_order_no) AS qc_checked_today from units WHERE isqcchecked = true AND (DATE(date_modified) = CURRENT_DATE)"
        )
        .catch((e) => console.log("qc all time overview error", e));

      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
