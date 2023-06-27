import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface AccountContextType {
  user: any;
  setUser: any;
}

export const AccountContext = createContext<AccountContextType | any>(null);

interface ChildrenProps {
  children: React.ReactNode;
  connect?: () => void | any;
}
// Because we are using next js

if (typeof window !== "undefined") {
  // Perform localStorage action
  // used var to be able to access value outside this code block
  var tokenValue = localStorage.getItem("token");
}
function UserContextFunction(props: ChildrenProps) {
  const [user, setUser] = useState<null | any>({
    loggedIn: null,
    token: tokenValue,
  });
  const router = useRouter();
  useEffect(() => {
    fetch(`http://localhost:3001/hhp/v1/api/auth/login`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((response) => {
        if (!response || !response.ok || response.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        router.push("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {props.children}
    </AccountContext.Provider>
  );
}
export default UserContextFunction;
