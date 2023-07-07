import UserContextFunction from "@/state/AccountContext";
// import { AppStateProvider } from "@/state/AppStateContext";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { TableInfoContextProvider } from "../context/TableInfoContext";

import { SessionProvider } from "next-auth/react";

// Extending the chakra/ui theme
const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
});

// Instances of useSession will then have access to the session data and status. The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows.

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // socket.connect();

  return (
    <SessionProvider session={session}>
      <TableInfoContextProvider>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </RecoilRoot>
      </TableInfoContextProvider>
    </SessionProvider>
  );
}
