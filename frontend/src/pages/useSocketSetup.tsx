import { useEffect, useContext } from "react";
import socket from "../../components/socket";
import { AccountContext } from "@/state/AccountContext";

// This logs the user out if there is a problem with the backend connection
const useSocketSetup = () => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();
    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
    };
  }, [setUser]);
};
export default useSocketSetup;
