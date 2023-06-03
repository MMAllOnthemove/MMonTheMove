import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface AccountContextType {
  user: any;
  setUser: any;
}

export const AccountContext = createContext<AccountContextType | any>(null);

interface ChildrenProps {
  children: React.ReactNode;
}
function UserContextFunction(props: ChildrenProps) {
  const [user, setUser] = useState<null | any>({ loggedIn: null });
  const router = useRouter();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_LOGIN}`, {
      credentials: "include",
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
        router.push("/management");
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
