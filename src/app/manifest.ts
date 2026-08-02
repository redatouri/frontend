import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — Camera Store Morocco`,
    short_name: BRAND.name,
    description:
      "Professional cameras, audio, lighting and filmmaking equipment in Morocco. DJI, Sony, Canon.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0891B2",
    lang: "fr",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
