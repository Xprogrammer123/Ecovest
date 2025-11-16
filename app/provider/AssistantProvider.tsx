"use client";

import React from "react";
import { AssistantRuntimeProvider, useAssistantRuntime } from "@assistant-ui/react";

const runtime = useAssistantRuntime();

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
