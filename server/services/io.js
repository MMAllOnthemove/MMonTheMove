import { Server } from "socket.io";
import httpServer from "./server_service.js";
import "dotenv/config";
export const io = new Server(httpServer, {
    /* options */
    cors: {
        origin: [
            process.env.NEXT_PUBLIC_REACT_URL,
            process.env.NEXT_PUBLIC_EXPO_URL,
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Allow credentials (cookies, authorization headers)
    },
});
