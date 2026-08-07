import type { HeroMobileSlide } from "@/components/marketing/HeroMobileCarousel";
import { HOME_HERO_DESKTOP_VIDEOS } from "@/lib/home-hero-videos";

export const HOME_HERO_MOBILE_SLIDES: HeroMobileSlide[] = [
  {
    src: "/home/hero-mobile-osmo-mobile-8p.png",
    alt: "DJI Osmo Mobile 8P — gimbal smartphone pro avec cadrage et suivi",
  },
  {
    src: "/home/hero-mobile-osmo-pocket-4.png",
    alt: "DJI Osmo Pocket 4 — caméra gimbal poche 1″ CMOS",
  },
  {
    src: "/home/hero-mobile-dji-mic-mini-2.png",
    alt: "DJI Mic Mini 2 — micro sans fil compact",
  },
];

export const HOME_IMAGES = {
  hero: {
    mobileSlides: HOME_HERO_MOBILE_SLIDES,
    desktopVideos: HOME_HERO_DESKTOP_VIDEOS,
  },
  microphone: {
    src: "/home/showcase-microphone.webp",
    alt: "Microphone studio professionnel",
  },
} as const;
