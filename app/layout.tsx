import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { siteContent } from "@/lib/content";
import "./globals.css";

const superstar = localFont({
  src: [
    { path: "../public/fonts/superstar.woff2" },
    { path: "../public/fonts/superstar.ttf" },
  ],
  variable: "--font-superstar",
  display: "swap",
});

const monocraft = localFont({
  src: [
    { path: "../public/fonts/monocraft.woff2" },
    { path: "../public/fonts/monocraft.ttf" },
  ],
  variable: "--font-monocraft",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteContent.title,
  description: siteContent.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${superstar.variable} ${monocraft.variable}`}>
      <body className="flex min-h-screen flex-col">
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
