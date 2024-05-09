import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Pages/Landing/Navbar";
import Body from "./Pages/Landing/Landing";



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
        <Navbar />
        <Body />
        {children}
        
      </body>
    </html>
  );
}
