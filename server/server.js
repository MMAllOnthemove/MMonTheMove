const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

// GET info from database
app.get("/management", async (req, res) => {
  try {
    const dbData = await pool.query("SELECT * FROM service_orders");
    res.json(dbData.rows);
  } catch (err) {
    console.log(err);
  }
});

// POST info to database
app.post("/management", async (req, res) => {
  const {
    service_order,
    warranty,
    model,
    fault,
    imei,
    serial_number,
    engineer,
    parts_issued,
    parts_ordered,
  } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO service_orders (service_order, warranty, model, fault, imei, serial_number, engineer, parts_issued, parts_ordered) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
      [
        service_order,
        warranty,
        model,
        fault,
        imei,
        serial_number,
        engineer,
        parts_issued,
        parts_ordered,
      ]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// POST user info to database
app.post("/register", async (req, res) => {
  const { fname, email, password, password2 } = req.body;
  let errors = [];
  if (!fname || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }
  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }
  if (errors.length > 0) {
    res.render("register", { errors });
  }else {
    let hashedPassword = await bcrypt.hash(password, 10);
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results)=>{
      if (err) {
        throw err
      }
      console.log(results.rows);
    })
  }

});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is up and listening on port localhost:${PORT}`);
});
module.exports = pool;
