import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
export const metadata: Metadata = {
  title: "MM ALL ELECTRONICS",
  description: "Inter-department",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body
      >
        <NextTopLoader
          color="#075985"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #075985,0 0 5px #075985"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
