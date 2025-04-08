import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_SERVER_URL, {
    transports: ["websocket"], // Only WebSocket, no polling fallback
    withCredentials: true,
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 3000,
});

export default socket;
