import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./pages/landing/Navbar";
import Body from "./pages/landing/Body";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Halal Finder",
  description: "Halal restaurant directory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Navbar />
        <Body />
        
      </body>
    </html>
  );
}
