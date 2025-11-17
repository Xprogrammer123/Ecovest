"use client";

import React from "react";
import { AssistantRuntimeProvider, useAssistantRuntime } from "@assistant-ui/react";


export function AssistantProvider({ children }: { children: React.ReactNode }) {

const runtime = useAssistantRuntime();

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
