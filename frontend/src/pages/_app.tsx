// import { AppStateProvider } from "@/state/AppStateContext";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });
// Instances of useSession will then have access to the session data and status. The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows.

export default function App({
  Component,
  pageProps: {  ...pageProps },
}: AppProps) {

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
          <RecoilRoot>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </RecoilRoot>
    </>
  );
}
