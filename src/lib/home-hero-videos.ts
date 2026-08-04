import type { HeroDesktopVideo } from "@/components/marketing/HeroDesktopVideoCarousel";

/** Lightweight poster used as desktop LCP while videos load. */
export const HOME_HERO_DESKTOP_POSTER = {
  src: "/home/hero-mic-bg.webp",
  alt: "DJI Mic Mini 2 — hero",
} as const;

/** First hero KV from each DJI product page (desktop only). */
export const HOME_HERO_DESKTOP_VIDEOS: HeroDesktopVideo[] = [
  {
    src: "/home/hero/mic-mini-2.mp4",
    label: "DJI Mic Mini 2",
  },
  {
    src: "/home/hero/osmo-pocket-4p.mp4",
    label: "DJI Osmo Pocket 4P",
    startAt: 4,
  },
];
