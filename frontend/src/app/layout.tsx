import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
export const metadata: Metadata = {
  title: "MM ALL ELECTRONICS",
  description: "Inter-department",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

      >
        <NextTopLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
