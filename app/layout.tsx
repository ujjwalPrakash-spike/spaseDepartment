import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar";
import CursorOrb from "@/components/reactBits/CursorOrb";
import DotField from "@/components/reactBits/DotField";
import Providers from "@/components/animationSmooth/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ujjwal Engineer",
  description: "Backend Developer • Go • TypeScript • Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col pt-[70px] cursor-default bg-[#dee1e4]">
        <Providers>
          <DotField />
          <CursorOrb />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}