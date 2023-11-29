// import { AppStateProvider } from "@/state/AppStateContext";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import {
  CurrentUserContext,
  ICurrentUserContextType,
} from "../../context/user";
import { useEffect, useState } from "react";

// Instances of useSession will then have access to the session data and status. The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows.
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const [userData, setUserData] = useState<ICurrentUserContextType>("");
  const getProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/`,
        {
          method: "POST",
          credentials: "include",
          cache: "default",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 1800 }, // revalidate at most every 30 minutes
          body: JSON.stringify({}),
        }
      );

      const getUserData = await res.json();

      setUserData(getUserData.email);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [userData]);
  return (
    <>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <ThemeProvider attribute="class">
            <CurrentUserContext.Provider value={userData}>
              <Component {...pageProps} />
            </CurrentUserContext.Provider>
          </ThemeProvider>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
