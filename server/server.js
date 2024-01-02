import compression from "compression";
import express from "express";
const app = express();
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { router as hhpjobsrouter } from "./routes/department/hhp/hhp_jobs_route.js";
import { router as hhpJobsHistory } from "./routes/history/hhp_jobs_history_routes.js";
import { router as feedback } from "./routes/feedback.js";
import { router as dashboard } from "./routes/department/hhp/dashboard.js";
// const engineers = require("./routes/engineers");
import { router as qc } from "./routes/department/hhp/qc.js";
import { router as countEngineers } from "./routes/department/hhp/engineer_count_route.js";
import { router as bookingAgents } from "./routes/department/hhp/booking_agent_jobs_route.js";
import { router as partsDept } from "./routes/department/parts/parts_dept_routes.js";
import { router as partsHistory } from "../server/routes/history/parts_dept_routes.js";
import { router as auth } from "./routes/auth/auth_route.js";
import "dotenv/config";

import { router as dtvTasks } from "./routes/department/dtv/tasks.js";
import { router as dtvChecklists } from "./routes/department/dtv/checklists.js";
import { router as dtvAnalytics } from "./routes/department/dtv/analytics.js";

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
app.use(process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT, hhpjobsrouter);
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

// DTV dashboard route
app.use("/drivers/api/v1/analytics", dtvAnalytics);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
