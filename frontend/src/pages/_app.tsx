// import { AppStateProvider } from "@/state/AppStateContext";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { TableInfoContextProvider } from "../context/TableInfoContext";
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
// Instances of useSession will then have access to the session data and status. The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows.

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // socket.connect();

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <TableInfoContextProvider>
          <RecoilRoot>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </RecoilRoot>
        </TableInfoContextProvider>
      </SessionProvider>
    </>
  );
}
