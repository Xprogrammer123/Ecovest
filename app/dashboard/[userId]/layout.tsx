"use client";

import React from "react";
import { AssistantProvider } from "../../provider/AssistantProvider";
import { AssistantModal } from "../components/ai-components/assistant-ui/assistant-modal";
import Sidebar from "../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AssistantProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f9f8]">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto md:ml-[22rem]">
          {children}
          <AssistantModal />
        </main>
      </div>
    </AssistantProvider>
  );
}
