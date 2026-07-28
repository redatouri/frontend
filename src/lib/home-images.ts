export const HOME_IMAGES = {
  hero: {
    src: "/home/hero-osmo-pocket-3.webp",
    alt: "Dji osmo pocket 3 standard",
  },
  microphone: {
    src: "/home/showcase-microphone.webp",
    alt: "Microphone studio professionnel",
  },
} as const;

export const HOME_SHOWCASES = [
  {
    id: "microphone",
    image: HOME_IMAGES.microphone,
    href: "/collections/audio",
    align: "center" as const,
    theme: "dark" as const,
    titleKey: "showcaseMicrophoneTitle",
    subtitleKey: "showcaseMicrophoneSubtitle",
    ctaKey: "showcaseMicrophoneCta",
  },
] as const;
