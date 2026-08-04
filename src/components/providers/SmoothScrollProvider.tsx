"use client";

import { useIsDesktop } from "@/hooks/use-media-query";
import { useEffect, useRef } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop();
  const lenisRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!isDesktop) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    let frame = 0;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [isDesktop]);

  return <>{children}</>;
}
