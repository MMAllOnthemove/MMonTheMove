import UserContextFunction from "@/state/AccountContext";
// import { AppStateProvider } from "@/state/AppStateContext";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import socket from "../../components/socket";

// Extending the chakra/ui theme
const theme = extendTheme({
  fonts: {
    heading: `'Inter Tight Variable', sans-serif`,
    body: `'Inter Tight Variable', sans-serif`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  socket.connect();
  return (
    <UserContextFunction>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextFunction>
  );
}
// export default function App({ Component, pageProps }: AppProps) {
//   socket.connect();
//   return (
//     <UserContextFunction>
//       <AppStateProvider>
//         <ChakraProvider theme={theme}>
//           <DndProvider backend={HTML5Backend}>
//             <Component {...pageProps} />
//           </DndProvider>
//         </ChakraProvider>
//       </AppStateProvider>
//     </UserContextFunction>
//   );
// }
