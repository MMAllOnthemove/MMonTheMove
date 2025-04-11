import { useEffect, useState } from "react";
import socket from "../socket";

const useSocket = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        const handleConnect = () => {
            setIsConnected(true);
        };

        const handleDisconnect = (reason: any) => {
            // console.log("disconnect reason", reason);
            setIsConnected(false);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        // socket.on("connect_error", (err) => {
        //     console.error("⚠️ Connection Error:", err.message);
        // });
        // Ensures socket reconnects on page refresh
        if (!socket.connected) {
            // console.log("Connecting socket...");
            socket.connect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, []);

    return { socket, isConnected };
};

export default useSocket;
