// import { AppStateProvider } from "@/state/AppStateContext";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";

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
  return (
    <>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
