"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
      <Toaster theme="dark" position="top-center" richColors />
    </SmoothScrollProvider>
  );
}
