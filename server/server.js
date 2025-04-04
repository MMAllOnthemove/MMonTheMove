// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
const app = express();

// Routes
import { router as auth } from "./routes/auth/auth_route.js";
import { router as booking_agents } from "./routes/booking_agents/index.js";
import { router as claims } from "./routes/department/claims/index.js";
import { router as hhpjobsrouter } from "./routes/department/hhp/hhp_jobs_route.js";
import { router as dtv_hajobsrouter } from "./routes/department/dtv_ha/dtv_ha_jobs_route.js";
import { router as engineers } from "./routes/engineers/index.js";
import { router as stores } from "./routes/stores/index.js";
import { router as checklists } from "./routes/driver_app/checklists/index.js";
import { router as drivers } from "./routes/driver_app/drivers/index.js";
import { router as otp } from "./routes/otp/index.js";
import { router as add_images_checklist } from "./routes/tools/index.js";
import QCfileRoutesModule from "./routes/file_uploads/index.cjs";
import dtvhaFiles from "./routes/file_uploads/dtv_ha_files_route.cjs";
import { router as ticketComments } from "./routes/comments/index.js";
import { router as ticketAttachments } from "./routes/attachments/index.js";
import { router as parts } from "./routes/parts/index.js";
import { router as cars } from "./routes/cars/index.js";
import { router as fuel } from "./routes/fuel_consumption/index.js";
import { router as devices } from "./routes/devices/index.js";
import { router as customer_visits } from "./routes/customer_visits/index.js";
import { router as customers } from "./routes/customers/index.js";
import { router as assembly_terms } from "./routes/terms_and_conditions/index.js";
import { router as hhp_reports } from "./routes/request_reports/index.js";

const { router: fileRoutes } = QCfileRoutesModule;
const { router: dtvFiles } = dtvhaFiles;

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials (cookies, authorization headers)
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json()); // Handle JSON requests
app.use(compression());
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");

// Authentication
app.use("/auth", auth);

// HHP jobs
app.use("/api/v1/hhp/jobs", hhpjobsrouter);
app.use("/api/v1/hhp/reports", hhp_reports);
// dtv jobs
app.use("/api/v1/dtv_ha/jobs", dtv_hajobsrouter);
app.use("/engineers", engineers);
app.use("/stores", stores);
app.use("/booking_agents", booking_agents);
app.use("/claims", claims);
app.use("/checklists", checklists);
app.use("/drivers", drivers);
app.use("/otp", otp);
app.use("/api/v1/hhp/files", fileRoutes);
app.use("/api/v1/dtv_ha/files", dtvFiles);
app.use("/api/v1/parts", parts);
app.use("/api/v1/cars", cars);
app.use("/api/v1/comments", ticketComments);
app.use("/api/v1/attachments", ticketAttachments);
app.use("/api/v1/customer_visits", customer_visits);
app.use("/api/v1/fuel", fuel);
app.use("/api/v1/devices", devices);
app.use("/api/v1/customers", customers);
app.use("/api/v1/terms/assembly", assembly_terms);
app.use("/tools/dev/add_images_checklist", add_images_checklist);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
        console.log(`Server is up`);
    }
});
