// Imports
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { verifyJwtToken } from "./middleware/authUtils.js";
import app from "./services/app_service.js";
import { io } from "./services/io.js";
import httpServer from "./services/server_service.js";
import { pool } from "./db.js";
import appLogs from "./controllers/logs/logs.js";
// Routes
import { router as ticketAttachments } from "./routes/attachments/index.js";
import { router as auth } from "./routes/auth/auth_route.js";
import { router as booking_agents } from "./routes/booking_agents/index.js";
import { router as cars } from "./routes/cars/index.js";
import { router as ticketComments } from "./routes/comments/index.js";
import { router as customer_visits } from "./routes/customer_visits/index.js";
import { router as customers } from "./routes/customers/index.js";
import { router as claims } from "./routes/department/claims/index.js";
import { router as dtv_hajobsrouter } from "./routes/department/dtv_ha/dtv_ha_jobs_route.js";
import { router as hhpjobsrouter } from "./routes/department/hhp/hhp_jobs_route.js";
import { router as devices } from "./routes/devices/index.js";
import { router as checklists } from "./routes/driver_app/checklists/index.js";
import { router as drivers } from "./routes/driver_app/drivers/index.js";
import { router as engineers } from "./routes/engineers/index.js";
import dtvhaFiles from "./routes/file_uploads/dtv_ha_files_route.cjs";
import QCfileRoutesModule from "./routes/file_uploads/index.cjs";
import { router as fuel } from "./routes/fuel_consumption/index.js";
import { router as otp } from "./routes/otp/index.js";
import { router as parts } from "./routes/parts/index.js";
import { router as hhp_reports } from "./routes/request_reports/index.js";
import { router as stores } from "./routes/stores/index.js";
import { router as assembly_terms } from "./routes/terms_and_conditions/index.js";
import { router as add_images_checklist } from "./routes/tools/index.js";
import { router as addAttachments } from "./controllers/tools/add_ticket_images_router.js";
import { router as hhpDashboard } from "./routes/department/hhp/dashboard.js";
const { router: fileRoutes } = QCfileRoutesModule;
const { router: dtvFiles } = dtvhaFiles;

io.use((socket, next) => {
    const token = socket.handshake.headers.cookie?.split("=")[1]; // Extract token from cookies
    if (!token) return next(new Error("Authentication error"));
    const user = verifyJwtToken(token);
    if (!user) return next(new Error("Invalid token"));

    socket.userId = user.user_unique_id; // Attach user info to the socket
    console.log(socket.userId);
    next();
});

io.on("connection", (socket) => {
    console.log(`✅ A user connected: ${socket.userId}`);
    // Broadcast when a new task is added
    socket.on("addTask", (task) => {
        io.emit("addTask", task); // Send to all clients
    });

    // Broadcast when a task is updated
    socket.on("updateTask", (updatedTask) => {
        io.emit("updateTask", updatedTask); // Send to all clients
    });

    // Broadcast when a task is deleted
    socket.on("deleteTask", async (task) => {
        try {
            // const userId = socket.userId; // Extract user ID from socket
            // we are already getting the user id with the params

            const matchUser = await pool.query(
                "SELECT email from company_people WHERE user_unique_id = $1 limit 1",
                [task?.deletedBy]
            );
            await appLogs("DELETE", matchUser?.rows[0]?.email, task);
            io.emit("deleteTask", {
                task: task?.id,
                deletedBy: matchUser?.rows[0]?.email,
            }); // Send to all clients
        } catch (error) {
            if (process.env.NODE_ENV !== "production")
                console.error("Error deleting task (socket error)", error);
        }
    });
    // Broadcast when a new otp is added
    socket.on("addOtp", (task) => {
        io.emit("addOtp", task); // Send to all clients
    });
    // Broadcast when a new booking is added
    socket.on("bookingAgentTask", (task) => {
        io.emit("bookingAgentTask", task); // Send to all clients
    });
    // Broadcast when a new part is added
    // socket.on("addPart", (task) => {
    //     io.emit("addPart", task); // Send to all clients
    // });
    // Broadcast when a part is updated
    socket.on("updatePart", (updatedPart) => {
        io.emit("updatePart", updatedPart); // Send to all clients
    });
    socket.on("deletePart", (deletedPart) => {
        io.emit("deletePart", deletedPart); // Send to all clients
    });
    socket.on("addCarChecklist", (task) => {
        io.emit("addCarChecklist", task); // Send to all clients
    });
    socket.on("updateCarChecklist", (task) => {
        io.emit("updateCarChecklist", task); // Send to all clients
    });
    socket.on("addTicketComment", (task) => {
        io.emit("addTicketComment", task); // Send to all clients
    });

    // Broadcast when a new customer visit is added
    // socket.on("addCustomerVisit", (customerVisit) => {
    //     console.log("addCustomerVisit", customerVisit);
    //     io.emit("addCustomerVisit", customerVisit); // Send to all clients
    // });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.userId}`);
    });
});
app.use(
    cors({
        origin: [
            process.env.NEXT_PUBLIC_REACT_URL,
            process.env.NEXT_PUBLIC_EXPO_URL,
        ],
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
app.use("/api/v1/hhp/dashboard", hhpDashboard);
app.use("/api/v1/hhp/reports", hhp_reports);
// dtv jobs
app.use("/api/v1/dtv_ha/jobs", dtv_hajobsrouter);
app.use("/engineers", engineers);
app.use("/stores", stores);
app.use("/booking_agents", booking_agents);
app.use("/claims", claims);
app.use("/attachments", addAttachments);
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
httpServer.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
        console.log(`Server is up`);
    }
});
