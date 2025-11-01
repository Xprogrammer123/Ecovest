"use client";

import Sidebar from "../components/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f9f8]">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
