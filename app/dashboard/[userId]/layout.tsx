"use client";
import { AssistantModal } from "../components/ai-components/assistant-ui/assistant-modal";
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

      <main className="flex-1 p-4 md:p-6 overflow-y-auto md:ml-[22rem]">
        {children}

      <AssistantModal />
      </main>
    </div>
  );
}
