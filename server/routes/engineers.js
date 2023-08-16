const express = require('express')
const router = express.Router();
const pool = require("../db");

// Filter by engineers

// Engineer Jobs fixed for today

router.get(
  "/today",
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

router.get(
  "/month",
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

router.get(
  "/all-time",
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




module.exports = router