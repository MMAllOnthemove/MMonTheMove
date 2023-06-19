import { io } from "socket.io-client";

const socket = new io(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
  autoConnect: false,
  withCredentials: false,
});

export default socket;
