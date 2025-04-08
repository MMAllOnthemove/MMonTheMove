import { Server } from "socket.io";
import httpServer from "./server_service.js";
import "dotenv/config";
export const io = new Server(httpServer, {
    /* options */
    // todo: fix the expo url in prod
    cors: {
        origin: [
            process.env.NEXT_PUBLIC_REACT_URL,
            "http://192.168.1.126:8081",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials (cookies, authorization headers)
    },
});
