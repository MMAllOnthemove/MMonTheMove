const compression = require("compression");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const hhpJobs = require("./routes/department/hhp/hhp_jobs_route");
const hhpJobsHistory = require("./routes/history/hhp_jobs_history_routes");
const feedback = require("./routes/feedback");
const dashboard = require("./routes/department/hhp/dashboard");
// const engineers = require("./routes/engineers");
const qc = require("./routes/department/hhp/qc");
const countEngineers = require("./routes/department/hhp/engineer_count_route");
const bookingAgents = require("./routes/department/hhp/booking_agent_jobs_route");
const partsDept = require("./routes/department/parts/parts_dept_routes");
const partsHistory = require("../server/routes/history/parts_dept_routes");
const auth = require("./routes/auth/auth_route");
require("dotenv").config();

const dtvTasks = require("./routes/department/dtv/tasks");
const dtvChecklists = require("./routes/department/dtv/checklists");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(compression());
// app.use(sessionMiddleware);
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");
// app.use(limiter);

// Authentication
app.use("/auth", auth);

// HHP jobs
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, hhpJobs);
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, hhpJobsHistory);

// Feedback
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_FEEDBACK, feedback);

// HHP dashboard begins here
app.use(
  process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT,
  dashboard
);

// HHP Engineer graphs
// app.use(process.env.NEXT_PUBLIC_SERVER_ENGINEER_JOBS_COUNT_OVERVIEW, engineers);

// HHP QC graphs
app.use(process.env.NEXT_PUBLIC_SERVER_QC_CHECKED_JOBS_COUNT_OVERVIEW, qc);

// HHP Count engineers
app.use(process.env.NEXT_PUBLIC_SERVER_COUNT_ALL_ENGINEERS, countEngineers);

// HHP Booking agents
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_AGENTS, bookingAgents);

// Parts dept
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_PARTS, partsDept);
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_PARTS_HISTORY, partsHistory);

// DTV Tasks route
app.use("/drivers/api/v1/task", dtvTasks);

// DTV Checklists route
app.use("/drivers/api/v1/checklist", dtvChecklists);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
