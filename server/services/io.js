import { Server } from "socket.io";
import httpServer from "./server_service.js";
export const io = new Server(httpServer, {
    /* options */
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials (cookies, authorization headers)
    },
});
