const express = require('express')
const router = express.Router();
const pool = require("../db");


// QC CHECKED ALL 
router.get(
  "/",
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
router.get(
  "/today",
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


module.exports = router