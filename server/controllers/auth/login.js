const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../../db");
const jwtGenerator = require("../../utils/jwt-helpers");
const jwt = require("jsonwebtoken");

//authorizeentication

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let capitalizedEmail = email.toLowerCase();
  const maxAge = 3 * 24 * 60 * 60;

  try {
    const user = await pool.query(
      "SELECT * FROM company_people WHERE email = $1",
      [capitalizedEmail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);

    res.cookie("token", jwtToken, {
      withCredentials: true,
      secure: (process.env.NODE_ENV = "development" ? false : true),
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    return res.json({ jwtToken });
  } catch (err) {
    console.log("loginUser", err);
    res.status(500).json("Server error");
  }
};

module.exports = loginUser;
