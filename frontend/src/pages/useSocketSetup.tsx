import { useEffect, useContext } from "react";
import { AccountContext } from "@/state/AccountContext";
import { socket } from "../../components/socket";

// This logs the user out if there is a problem with the backend connection
const useSocketSetup = (socket: null | any) => {
  const { setUser } = useContext(AccountContext);
  // let socket: null | any;
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
