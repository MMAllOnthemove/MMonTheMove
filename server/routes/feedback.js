const express = require('express')
const router = express.Router();
const pool = require("../db");



// Post feedback to database
router.post(
 "/",
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
router.get(
  "/",
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


module.exports = router