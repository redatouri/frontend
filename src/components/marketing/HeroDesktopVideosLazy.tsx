"use client";

import type { HeroDesktopVideo } from "@/components/marketing/HeroDesktopVideoCarousel";
import { useIsDesktop } from "@/hooks/use-media-query";
import dynamic from "next/dynamic";

const HeroDesktopVideoCarousel = dynamic(
  () =>
    import("@/components/marketing/HeroDesktopVideoCarousel").then((m) => ({
      default: m.HeroDesktopVideoCarousel,
    })),
  { ssr: false },
);

interface HeroDesktopVideosLazyProps {
  videos: HeroDesktopVideo[];
}

/** Desktop hero videos — never downloaded on mobile. */
export function HeroDesktopVideosLazy({ videos }: HeroDesktopVideosLazyProps) {
  const isDesktop = useIsDesktop();

  if (!isDesktop || videos.length === 0) return null;

  return <HeroDesktopVideoCarousel videos={videos} />;
}
