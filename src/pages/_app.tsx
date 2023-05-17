import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DndProvider options={HTML5toTouch}>
        <Component {...pageProps} />
      </DndProvider>
    </ChakraProvider>
  );
}
