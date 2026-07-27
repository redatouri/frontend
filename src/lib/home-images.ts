export const HOME_IMAGES = {
  hero: {
    src: "/home/hero-gimbal.webp",
    alt: "Stabilisateur gimbal DJI RS4",
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
