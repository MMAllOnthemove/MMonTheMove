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
  const maxAge = 3 * 24 * 60 * 60;
  try {
    const user = await pool.query(
      "SELECT * FROM company_people WHERE email = $1",
      [email]
    );

    const emailRegex = /^[^@\s]+@allelectronics.co.za$/i;
    const checkEmailRegex = emailRegex.test(capitalizedEmail) === true;

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    } else if (checkEmailRegex) {
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

      // const jwtToken = jwt.sign(
      //   { user: { id: newUser.rows[0].user_id } },
      //   process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY,
      //   {
      //     expiresIn: 86400, // 24 hours
      //   }
      // );
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);
      res.cookie("token", jwtToken, {
        withCredentials: true,
        secure: (process.env.NODE_ENV = "development" ? false : true),
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      return res.json({ jwtToken });
    } else {
      return res.status(400).json("Signup failed; Invalid email or password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

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

    // const jwtToken = jwt.sign(
    //   { user: { id: user.rows[0].user_id } },
    //   process.env.NEXT_PUBLIC_BACKEND_JWT_TOKEN_KEY,
    //   {
    //     expiresIn: 86400, // 24 hours
    //   }
    // );

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

// const verifyUser = (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.log("verifyUser", err);
//     res.status(500).send("Server error");
//   }
// };

module.exports = { registerUser, loginUser };
