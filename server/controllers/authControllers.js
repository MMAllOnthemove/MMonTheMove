const pool = require("../db");
const bcrypt = require("bcrypt");

module.exports.handleLogin = async (req, res) => {
  if (req.session.user && req.session.user.email) {
    res.json({ loggedIn: true, email: req.session.user.email });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports.attemptLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT user_id, email, password FROM users u WHERE u.email=$1",
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
      };
      res.json({ loggedIn: true, email: req.body.email });
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
  const existingUser = await pool.query(
    "SELECT email from users WHERE email=$1",
    [req.body.email]
  );

  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(email, password) values($1,$2) RETURNING user_id, email",
      [req.body.email, hashedPass]
    );
    req.session.user = {
      email: req.body.email,
      id: newUserQuery.rows[0].user_id,
    };

    res.json({ loggedIn: true, email: req.body.email });
  } else {
    res.json({ loggedIn: false, status: "email taken" });
  }
};
