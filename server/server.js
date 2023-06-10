const express = require("express");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const server = require("http").createServer(app);
const { sessionMiddleware, wrap } = require("./controllers/serverControllers");
const { authorizeUser } = require("./controllers/socketControllers");

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
app.use(sessionMiddleware);
app.use("/auth", authRouter);

// lOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
io.use(wrap(sessionMiddleware));
// io.use(authorizeUser);
io.on("connect", (socket) => {});

// GET table info from database
app.get("/management", async (req, res) => {
  try {
    const dbData = await pool.query("SELECT * FROM service_orders");
    res.json(dbData.rows);
  } catch (err) {
    console.log(err);
  }
});

// POST table info to database
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

function get_board() {
  // const boardData = {
  //   tasks: {
  //     "task-1": { id: "task-1", content: "create video" },
  //     "task-2": { id: "task-2", content: "edit video" },
  //     "task-3": { id: "task-3", content: "publish video" },
  //   },
  //   columns: {
  //     "column-1": {
  //       id: "column-1",
  //       title: "To do",
  //       taskIds: ["task-2", "task-3"],
  //     },
  //     "column-2": {
  //       id: "column-2",
  //       title: "Done",
  //       taskIds: ["task-1"],
  //     },
  //   },
  //   columnOrder: ["column-1", "column-2"],
  // };
  // res.json(boardData);
  return { board: boardData };
}

// Get kanban data from database
app.get("/board", async (req, res) => {
  function get_board() {
    const boardData = {
      tasks: {
        "task-1": { id: "task-1", content: "create video" },
        "task-2": { id: "task-2", content: "edit video" },
        "task-3": { id: "task-3", content: "publish video" },
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: ["task-2", "task-3"],
        },
        "column-2": {
          id: "column-2",
          title: "Done",
          taskIds: ["task-1"],
        },
      },
      columnOrder: ["column-1", "column-2"],
    };
    res.json(boardData);
    return { board: {} };
  }
});
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is up and listening on port localhost:${PORT}`);
});
module.exports = pool;
