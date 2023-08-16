const express = require('express')
const router = express.Router();
const pool = require("../db");



// Calculate total jobs in
// DISTINCT to filter out any duplicates

router.get(
  "/in/today",
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
router.get(
  "/in",
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


router.get(
  "/pending/today",
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

  router.get(
  "/pending",
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
router.get(
  "/complete/today",
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
router.get(
 "/complete",
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


module.exports = router