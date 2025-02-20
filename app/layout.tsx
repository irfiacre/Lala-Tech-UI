"use client";
import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { primaryColorBg } from "@/constants/values";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={poppins.className}
          style={{ backgroundColor: primaryColorBg }}
        >
          <ToastContainer />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
