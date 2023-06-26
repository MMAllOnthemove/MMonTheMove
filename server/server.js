const express = require("express");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const server = require("http").createServer(app);
// const { sessionMiddleware, wrap } = require("./controllers/serverControllers");
const { authorizeUser } = require("./controllers/socketControllers");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(sessionMiddleware);
app.use("/auth", authRouter);
app.set("trust proxy", 1);

// lOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
// io.use(wrap(sessionMiddleware));
// io.use(authorizeUser);
io.on("connect", (socket) => {});

// GET table info from database
app.get("/hhp/api/v1/management", async (req, res) => {
  try {
    const dbData = await pool.query("SELECT * FROM units");
    res.json(dbData.rows);
  } catch (err) {
    console.log(err);
  }
});

// POST table info to database
app.post("/hhp/api/v1/management", async (req, res) => {
  const {
    service_order,
    createdDate,
    createdTime,
    model,
    warranty,
    engineer,
    fault,
    imei,
    serial_number,
    inHouseStatus,
    qualityControl,
    engineerAssignDate,
    engineerAssignTime,
    engineerAnalysis,
    ticketNumber,
  } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO units (service_order_no, created_date, created_time, model, warranty, engineer, fault, imei, serial_number, in_house_status, quality_control, engineer_assign_date, engineer_assign_time, engineer_analysis, ticket_number) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
      [
        service_order,
        createdDate,
        createdTime,
        model,
        warranty,
        engineer,
        fault,
        imei,
        serial_number,
        inHouseStatus,
        qualityControl,
        engineerAssignDate,
        engineerAssignTime,
        engineerAnalysis,
        ticketNumber,
      ]
    );
    console.log(results);
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

// Update info on database

app.put("/hhp/api/v1/management/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    console.log(id);
    const { inHouseStatus, qualityControl, engineerAnalysis } = req.body;
    const editQuery = await pool.query(
      "UPDATE units SET in_house_status = $1, quality_control = $2, engineer_analysis = $3 WHERE id = $4 returning id",
      [inHouseStatus, qualityControl, engineerAnalysis, id]
    );

    const successstatus = res.status(200).json({
      status: "success",
      data: {
        row: editQuery.rows[0].id,
      },
    });
    console.log(successstatus);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
server.listen(PORT, () => {
  console.log(`Server is up and listening on port localhost:${PORT}`);
});
module.exports = pool;
