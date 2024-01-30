import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  // TODO: check loading states
  // if (loading === true) return <p>Loading...</p>;
  return (
    <>
      <RecoilRoot>
        <ThemeProvider attribute="class">
          <Toaster />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
