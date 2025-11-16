"use client";

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AssistantRuntimeProvider, useAssistantRuntime } from "@assistant-ui/react"; // ✅ correct import

// ✅ Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ use runtime instance once globally
const runtime = useAssistantRuntime();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <head>
        <title>Ecovest – Smart Sustainable Investments</title>
        <meta
          name="description"
          content="Ecovest helps you invest in eco-friendly, sustainable projects powered by AI recommendations."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f9f8]`}
      >

        <AssistantRuntimeProvider runtime={runtime}>
          {children}
        </AssistantRuntimeProvider>
      </body>
    </html>
  );
}
