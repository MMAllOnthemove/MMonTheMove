const express = require("express");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const server = require("http").createServer(app);
const session = require("express-session");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "fnwefnewncfjewnfcoienwocfenoi",
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use("/auth", authRouter);

// lOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

io.on("connect", (socket) => {});
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

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is up and listening on port localhost:${PORT}`);
});
module.exports = pool;
