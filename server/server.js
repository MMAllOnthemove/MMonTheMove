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
    origin: process.env.NEXT_PUBLIC_REACT_URL,
    credentials: "true",
  },
});

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_REACT_URL,
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
    const dbData = await pool.query("SELECT * FROM units");
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
    engineerAnalysis,
    status,
    ascCode,
    createdBy,
    createdDate,
    createdTime,
    statusDesc,
    accessory,
    producedDate,
    remark,
    warrantyTermRemark,
    customerRequestDate,
    customerRequestTime,
    acknowledgeTime,
    acknowledgeDate,
    completeDate,
    completeTime,
    engineerAssignTime,
    engineerAssignDate,
    firstAppointmentDate,
    firstAppointmentTime,
    firstVisitTime,
    firstVisitDate,
    firstCustomerTime,
    goodsDeliveryTime,
    goodsDeliveryDate,
    lastAppointmentDate,
    lastAppointmentTime,
    lastChangeTime,
    lastChangeDate,
    lastVisitDate,
    lastVisitTime,
    repairReceiveTime,
    repairReceiveDate,
    unitReceiveDate,
    unitReceiveTime,
    customerFirstName,
    customerLastName,
    customerStreetAddress,
    customerDistrict,
    customerProvince,
    customerZipCode,
    customerHomePhone,
    customerMobilePhone,
    customerOfficePhone,
    email,
    customerCode,
    purchasedDate,
    firstCustomerDate,
  } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO units (service_order_no, warranty, model,fault,imei, serial_number,engineer,engineer_analysis,asc_code, created_by, created_date,created_time,status,status_desc,accessory,produced_date,remark,wty_term_remark,customer_request_date,customer_request_time,acknowledge_time,acknowledge_date,complete_date,complete_time,engineer_assigned_time,engineer_assigned_date,first_appointment_date, first_appointment_time, first_visit_time, first_visit_date, first_customer_time, goods_delivery_time, goods_delivery_date, last_appointment_date, last_appointment_time, last_change_time, last_change_date, last_visit_date, last_visit_time, repair_receive_time, repair_receive_date, unit_receive_date, unit_receive_time, customer_first_name, customer_last_name, customer_street_address, customer_district, customer_province, customer_zip_code, customer_home_phone, customer_mobile_phone, customer_office_phone, customer_email, customer_code, purchased_date, first_customer_date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56) returning *",
      [
        service_order,
        warranty,
        model,
        fault,
        imei,
        serial_number,
        engineer,
        engineerAnalysis,
        ascCode,
        createdBy,
        createdDate,
        createdTime,
        status,
        statusDesc,
        accessory,
        producedDate,
        remark,
        warrantyTermRemark,
        customerRequestDate,
        customerRequestTime,
        acknowledgeTime,
        acknowledgeDate,
        completeDate,
        completeTime,
        engineerAssignTime,
        engineerAssignDate,
        firstAppointmentDate,
        firstAppointmentTime,
        firstVisitTime,
        firstVisitDate,
        firstCustomerTime,
        goodsDeliveryTime,
        goodsDeliveryDate,
        lastAppointmentDate,
        lastAppointmentTime,
        lastChangeTime,
        lastChangeDate,
        lastVisitDate,
        lastVisitTime,
        repairReceiveTime,
        repairReceiveDate,
        unitReceiveDate,
        unitReceiveTime,
        customerFirstName,
        customerLastName,
        customerStreetAddress,
        customerDistrict,
        customerProvince,
        customerZipCode,
        customerHomePhone,
        customerMobilePhone,
        customerOfficePhone,
        email,
        customerCode,
        purchasedDate,
        firstCustomerDate,
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

// Just added this will come back to edit it
app.post("/api/edit", async (req, res) => {
  const { engineer_analysis } = req.body;
  try {
    const reults = await pool.query(
      "INSERT INTO units (engineer_analysis) VALUES ($1) WHERE id = $1 ",
      [engineer_analysis]
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
const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
server.listen(PORT, () => {
  console.log(`Server is up and listening on port localhost:${PORT}`);
});
module.exports = pool;
