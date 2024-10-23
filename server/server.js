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
import { router as hhpjobsrouter } from "./routes/department/hhp/hhp_jobs_route.js";
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
app.use(express.json()); // Handle JSON requests
app.use(compression());
app.set("trust proxy", 1); // trust first proxy
app.disable("x-powered-by");

// Authentication
app.use("/auth", auth);

// HHP jobs
app.use("/api/v1/hhp/jobs", hhpjobsrouter);

const PORT = process.env.NEXT_PUBLIC_EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server is up`);
});
