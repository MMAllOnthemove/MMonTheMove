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
  // using variable font, no need to specify weight
  // weight: ['100', '200', '300', '500', '600', '700', '800', '900'],
  // style: ['normal', 'italic'],
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
        <NextTopLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
