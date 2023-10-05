import { io } from "socket.io-client";

const socket = (user) =>
  new io(`${process.env.NEXT_PUBLIC_API_SERVER_URL}`, {
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: user.token,
    },
  });

export { socket };
