const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../../db");
const jwtGenerator = require("../../utils/jwt-helpers");

const verifyUserDashboard = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT email FROM company_people WHERE user_id = $1",
      [req.user.id]
    );
    // console.log(user.rows[0]);

    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json(user.rows[0]);
  } catch (err) {
    // console.error(err.message);
    // res.status(500).json("Server error");
  }
};

module.exports = { verifyUserDashboard };
