const express = require("express");
const router = express.Router();
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const hhpJobs = require("../server/routes/hhp_jobs_route");
const hhpJobsHistory = require("../server/routes/history/hhp_jobs_history_routes");
const feedback = require("../server/routes/feedback");
const dashboard = require("../server/routes/dashboard");
const engineers = require("../server/routes/engineers");
const qc = require("../server/routes/qc");
const countEngineers = require("../server/routes/engineer_count_route");
const bookingAgents = require("../server/routes/booking_agent_jobs_route");
const partsDept = require("../server/routes/parts_dept_routes");
const partsHistory = require("../server/routes/history/parts_dept_routes");
const auth = require("../server/routes/auth/auth_route");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: [],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
// app.use(sessionMiddleware);
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");
// app.use(limiter);

// Authentication
app.use("/auth", auth);
// app.use("/dashboard", authDashboard);

// All jobs
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, hhpJobs);
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, hhpJobsHistory);

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

// Count engineers
app.use(process.env.NEXT_PUBLIC_SERVER_COUNT_ALL_ENGINEERS, countEngineers);

// Booking agents
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_AGENTS, bookingAgents);

app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_PARTS, partsDept);
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_PARTS_HISTORY, partsHistory);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
