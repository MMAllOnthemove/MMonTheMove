const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const pool = require("./db");
const limiter = require("../server/controllers/rateLimiter");
const { v4: uuidv4 } = require("uuid");

const managementJobs = require("../server/routes/managementJobs");
const feedback = require("../server/routes/feedback");
const dashboard = require("../server/routes/dashboard");
const engineers = require("../server/routes/engineers");
const qc = require("../server/routes/qc");

require("dotenv").config();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(sessionMiddleware);
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");
// app.use(limiter);

// All jobs
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, managementJobs);

// Feedback
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_FEEDBACK, feedback);

// Dashboard begins here
app.use(
  process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT,
  dashboard
);

// Engineer graphs
app.use(process.env.NEXT_PUBLIC_SERVER_ENGINEER_JOBS_COUNT_OVERVIEW, engineers);

// QC graphs
app.use(process.env.NEXT_PUBLIC_SERVER_QC_CHECKED_JOBS_COUNT_OVERVIEW, qc);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
