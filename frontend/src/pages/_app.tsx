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
import Spinner from "@/components/Spinner";

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
  const [userData, setUserData] = useState<ICurrentUserContextType>();
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    try {
      // setLoading(true); // Set loading before sending API request
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
      //  setLoading(false); // Stop loading in case of error
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  // TODO: check loading states
  // if (loading === true) return <p>Loading...</p>;
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
