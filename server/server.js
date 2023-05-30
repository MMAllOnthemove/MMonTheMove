const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config()
const server = require("http").createServer(app);



const {
  sessionMiddleware,
  wrap
} = require("./controllers/serverController");
const { authorizeUser } = require("./controllers/socketController");

const io = new Server(server, {
  cors: {
    origin: `${process.env.NEXT_PUBLIC_REACT_URL}`,
    credentials: "true",
  },
});

// express Middleware
app.use(helmet());
app.use(
  cors({
    origin: `${process.env.NEXT_PUBLIC_REACT_URL}`,
    credentials: true,
  })
);
app.use(express.json());
// Share this session middlware with socket.io
app.use(sessionMiddleware);
app.use("/auth", authRouter);

// This means the ip will be coming from a different domain
// app.set("trust proxy", 1)

// session shared by app express middleware
io.use(wrap(sessionMiddleware));
io.use(authorizeUser);
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
