import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
    transports: ["websocket"], // Only WebSocket, no polling fallback
    withCredentials: true,
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 3000,
});

export default socket;
