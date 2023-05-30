const pool = require("../db");
const bcrypt = require("bcrypt");
const {v4: uuidv4} = require("uuid")

module.exports.handleLogin = (req, res, next) => {
  if (req.session.user && req.session.user.email) {
    console.log("logged in");
    res.json({ loggedIn: true, email: req.session.user.email });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports.attemptLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT user_id, email, password, unique_id FROM users u WHERE u.email=$1",
    [req.body.email]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].password
    );
    if (isSamePass) {
      req.session.user = {
        email: req.body.email,
        id: potentialLogin.rows[0].user_id,
        unique_id: potentialLogin.rows[0].unique_id,
      };
      res.json({ loggedIn: true, email: req.body.email });
    } else {
      console.log("encountered an error");

      res.json({ loggedIn: false, status: "Wrong email or password" });
    }
  } else {
    console.log("encountered an error");
    res.json({ loggedIn: false, status: "Wrong email or password" });
  }
};

module.exports.attemptSignup = async (req, res) => {
  const existingUser = await pool.query(
    `SELECT email from users WHERE email=$1`,
    [req.body.email]
  );
  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(fullName, email, password, unique_id) VALUES ($1, $2, $3, $4) RETURNING user_id, email",
      [req.body.fullName, req.body.email, hashedPass, uuidv4()]
    );
    req.session.user = {
      email: req.body.email,
      id: newUserQuery.rows[0].user_id,
      unique_id: newUserQuery.rows[0].unique_id,

    };
    res.json({ loggedIn: true, email: req.body.email });
  } else {
    console.log("encountered an error");
    res.json({ loggedIn: false, status: "Email taken" });
  }
};
