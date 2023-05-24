import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { AppStateProvider } from "@/state/AppStateContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { extendTheme } from "@chakra-ui/react";

// Extending the chakra/ui theme
const theme = extendTheme({
  fonts: {
    heading: `'Inter Tight Variable', sans-serif`,
    body: `'Inter Tight Variable', sans-serif`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <ChakraProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </ChakraProvider>
    </AppStateProvider>
  );
}
