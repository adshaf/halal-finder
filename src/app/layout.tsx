import type { Metadata } from "next";
import { Noto_Serif, Noto_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { RecaptchaProvider } from "@/components/providers/RecaptchaProvider";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HalalBites | Sydney's Halal Restaurant Guide",
  description:
    "Discover the best halal restaurants in Sydney. Verified listings with cuisine, location, hours, and halal credentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSerif.variable} ${notoSans.variable} bg-background-light font-sans text-slate-900 antialiased`}
      >
        <AuthProvider>
          <RecaptchaProvider>{children}</RecaptchaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
