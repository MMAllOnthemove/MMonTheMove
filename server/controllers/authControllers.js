const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSign, jwtVerify, getJwt } = require("./jwt/jwtAuth");
require("dotenv").config();

module.exports.handleLogin = async (req, res) => {
  // if (req.session.user && req.session.user.email) {
  //   res.json({ loggedIn: true, email: req.session.user.email });
  // } else {
  //   res.json({ loggedIn: false });
  // }
  const token = getJwt(req);

  if (!token) {
    res.json({ loggedIn: false });
    return;
  }

  jwtVerify(token, process.env.JWT_SECRET_KEY)
    .then(async (decoded) => {
      const potentialUser = await pool.query(
        "SELECT email FROM users u WHERE u.email = $1",
        [decoded.email]
      );

      if (potentialUser.rowCount === 0) {
        res.json({ loggedIn: false, token: null });
        return;
      }

      res.json({ loggedIn: true, token });
    })
    .catch(() => {
      res.json({ loggedIn: false });
    });
};

module.exports.attemptLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT id, email, password, unique_id FROM users u WHERE u.email=$1",
    [req.body.email]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].password
    );
    if (isSamePass) {
      // req.session.user = {
      //   email: req.body.email,
      //   id: potentialLogin.rows[0].id,
      //   unique_id: potentialLogin.rows[0].unique_id,
      // };
      jwtSign(
        {
          email: req.body.email,
          id: potentialLogin.rows[0].id,
          unique_id: potentialLogin.rows[0].unique_id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      )
        .then((token) => {
          res.json({ loggedIn: true, token });
        })
        .catch((err) => {
          console.log(err);
          res.json({ loggedIn: false, status: "Try again" });
        });
      // res.json({ loggedIn: true, email: req.body.email });
    } else {
      res.json({ loggedIn: false, status: "Wrong email or password!" });
      console.log("not good");
    }
  } else {
    console.log("not good");
    res.json({ loggedIn: false, status: "Wrong email or password!" });
  }
};

module.exports.attemptRegister = async (req, res) => {
  // Check if user creating account exists
  const existingUser = await pool.query(
    "SELECT email from users WHERE email=$1",
    [req.body.email]
  );

  // If user does not exist, proceed
  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(email, password, fullname) values($1, $2, $3) RETURNING id, email",
      [req.body.email, hashedPass, req.body.fullName]
    );
    // req.session.user = {
    //   email: req.body.email,
    //   id: newUserQuery.rows[0].id,
    //   unique_id: newUserQuery.rows[0].unique_id,
    // };
    jwtSign(
      {
        email: req.body.email,
        id: newUserQuery.rows[0].id,
        unique_id: newUserQuery.rows[0].unique_id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    )
      .then((token) => {
        res.json({ loggedIn: true, token });
      })
      .catch((err) => {
        console.log(err);
        res.json({ loggedIn: false, status: "Try again" });
      });
    // res.json({ loggedIn: true, email: req.body.email });
  } else {
    res.json({ loggedIn: false, status: "Email taken" });
  }
};

// Created this new one
module.exports.handleLogout = async (req, res) => {
  req.session.destroy();
  res.json({ loggedIn: false });
};
