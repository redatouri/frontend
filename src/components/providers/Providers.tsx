"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 1 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
        {children}
        <Toaster theme="dark" position="top-center" richColors />
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}
