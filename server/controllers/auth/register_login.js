const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../../db");
const jwtGenerator = require("../../utils/jwt-helpers");
const jwt = require("jsonwebtoken");

//authorizeentication

const registerUser = async (req, res) => {
  const { fullName, username, email, password, createdAt } = req.body;
  let capitalizedUsername = username.toLowerCase();
  let capitalizedFullName = fullName.toLowerCase();
  let capitalizedEmail = email.toLowerCase();

  try {
    const user = await pool.query(
      "SELECT * FROM company_people WHERE email = $1",
      [email]
    );

    const emailRegex = /^[^@\s]+@allelectronics.co.za$/i;
    const checkEmailRegex = emailRegex.test(capitalizedEmail) === true;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+@#\$%\^&\*])(?=.{8,})/;
    const checkPasswordRegex = passwordRegex.test(password) === true;

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    } else if (checkEmailRegex && checkPasswordRegex) {
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      let newUser = await pool.query(
        "INSERT INTO company_people (full_name, user_name, email, user_password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          capitalizedFullName,
          capitalizedUsername,
          email,
          bcryptPassword,
          createdAt,
        ]
      );
      // const jwtToken = jwtGenerator(newUser.rows[0].user_id );

      const jwtToken = jwt.sign(
        { user: { id: newUser.rows[0].user_id } },
        process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY,
        {
          expiresIn: 86400, // 24 hours
        }
      );
      return res.json({ jwtToken });
    } else {
      return res.status(400).json("Signup failed; Invalid email or password");
    }
  } catch (err) {
    // console.error(err.message);
    res.status(500).json("Server error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let capitalizedEmail = email.toLowerCase();
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
    // const jwtToken = jwtGenerator(user.rows[0].user_id);
    const jwtToken = jwt.sign(
      { user: { id: user.rows[0].user_id } },
      process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    return res.json({ jwtToken });
  } catch (err) {
    console.log("loginUser", err);
    res.status(500).json("Server error");
  }
};

const verifyUser = (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    // console.error(err.message);
    res.status(500).json("Server error");
  }
};

module.exports = { registerUser, loginUser, verifyUser };
