import UserContextFunction from "@/state/AccountContext";
// import { AppStateProvider } from "@/state/AppStateContext";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import socket from "../../components/socket";
import { RecoilRoot } from "recoil";
import { TableInfoContextProvider } from "../context/TableInfoContext";
// Extending the chakra/ui theme
const theme = extendTheme({
  fonts: {
    heading: `'Inter Tight Variable', sans-serif`,
    body: `'Inter Tight Variable', sans-serif`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // socket.connect();
  return (
    <UserContextFunction>
      <TableInfoContextProvider>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </RecoilRoot>
      </TableInfoContextProvider>
    </UserContextFunction>
  );
}
