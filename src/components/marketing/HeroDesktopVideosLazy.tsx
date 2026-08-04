"use client";

import type { HeroDesktopVideo } from "@/components/marketing/HeroDesktopVideoCarousel";
import { useIsDesktop } from "@/hooks/use-media-query";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroDesktopVideoCarousel = dynamic(
  () =>
    import("@/components/marketing/HeroDesktopVideoCarousel").then((m) => ({
      default: m.HeroDesktopVideoCarousel,
    })),
  { ssr: false },
);

interface HeroDesktopVideosLazyProps {
  videos: HeroDesktopVideo[];
  posterSrc?: string;
  onPlaying?: () => void;
}

function scheduleIdle(callback: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout: 3000 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, 1500);
  return () => window.clearTimeout(id);
}

/** Desktop hero videos — never downloaded on mobile; deferred until after LCP. */
export function HeroDesktopVideosLazy({
  videos,
  posterSrc,
  onPlaying,
}: HeroDesktopVideosLazyProps) {
  const isDesktop = useIsDesktop();
  const [loadVideos, setLoadVideos] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    const start = () => setLoadVideos(true);

    if (document.readyState === "complete") {
      return scheduleIdle(start);
    }

    const onLoad = () => scheduleIdle(start);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, [isDesktop]);

  if (!isDesktop || videos.length === 0 || !loadVideos) return null;

  return (
    <HeroDesktopVideoCarousel
      videos={videos}
      posterSrc={posterSrc}
      onPlaying={onPlaying}
    />
  );
}
