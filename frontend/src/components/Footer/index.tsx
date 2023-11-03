import { getProfile } from "@/functions/getLoggedInUserProfile";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Footer() {
  const [userData, setUserData] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let d = new Date();
  const router = useRouter();
  const checkAuthenticated = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/verify`,
      {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      }
    );

    const parseData = await res.json();
    parseData === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    if (parseData === false) {
      setIsAuthenticated(false);
      router.push("/auth/login");
    }
    // console.log("parseData", parseData);
  }, []);

  useEffect(() => {
    checkAuthenticated();
  }, [isAuthenticated]);

  useEffect(() => {
    getProfile({ setUserData });
  }, [isAuthenticated]);
  return (
    <footer className="footer dark:bg-[#15202B] flex justify-between items-center border-t dark:border-t-[#eee]">
      <p className="text-center font-medium dark:text-[#eee] text-sm">
        Logged in as{" "}
        <span className="text-sky-700 font-semibold">{userData}</span>
      </p>
      <p className="text-center font-semibold dark:text-[#eee] text-sm">
        &copy; MM ALL ELECTRONICS {d.getFullYear()}
      </p>
    </footer>
  );
}
