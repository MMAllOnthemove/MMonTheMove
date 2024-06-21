// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
const app = express();

// Routes
import { router as partsHistory } from "../server/routes/history/parts_dept_routes.js";
import { router as getAgents } from "./routes/agents/index.js";
import { router as auth } from "./routes/auth/auth_route.js";
import { router as dtvAnalytics } from "./routes/department/dtv/analytics.js";
import { router as dtvChecklists } from "./routes/department/dtv/checklists.js";
import { router as dtvTasks } from "./routes/department/dtv/tasks.js";
import { router as bookingAgents } from "./routes/department/hhp/booking_agent_jobs_route.js";
import { router as hhpjobsrouter } from "./routes/department/hhp/hhp_jobs_route.js";
import { router as otpRoute } from "./routes/department/hhp/otp.js";
import { router as qc } from "./routes/department/hhp/qc.js";
import { router as partsDept } from "./routes/department/parts/parts_dept_routes.js";
import { router as engineersRoute } from "./routes/engineers/index.js";
import { router as hhpJobsHistory } from "./routes/history/hhp_jobs_history_routes.js";

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

// OTP
app.use("/otp", otpRoute);

// HHP jobs
app.use("/api/v1/hhp/jobs", hhpjobsrouter);
app.use("/api/v1/hhp/jobs", hhpJobsHistory);

// HHP Engineer graphs
// app.use(process.env.NEXT_PUBLIC_SERVER_ENGINEER_JOBS_COUNT_OVERVIEW, engineers);

// HHP QC graphs
app.use("/api/v1/hhp/dashboard/qc-jobs-count/overview", qc);

// HHP Booking agents jobs
app.use("/api/v1/hhp/agents/jobs", bookingAgents);

// Parts dept
app.use("/api/v1/parts/jobs", partsDept);
app.use("/api/v1/parts/jobs/history", partsHistory);

// DTV Tasks route
app.use("/drivers/api/v1/task", dtvTasks);

// DTV Checklists route
app.use("/api/v1/dtv/checklist", dtvChecklists);

// DTV dashboard route
app.use("/api/v1/dtv/analytics", dtvAnalytics);

// Engineers
app.use("/engineers", engineersRoute);

// Booking agents
app.use("/agents", getAgents);

// Socket io

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is up`);
});
