import type { Metadata } from "next";
import { BRAND, getDefaultOgImage, getGoogleSiteVerification, getSiteUrl } from "@/lib/seo";
import "./globals.css";

const siteUrl = getSiteUrl();
const defaultDescription =
  "MovieCam (Movie Cam) — camera store & filmmaking equipment shop in Morocco. DJI, Sony, Canon, GoPro. Nationwide delivery, cash on delivery.";
const googleVerification = getGoogleSiteVerification();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — Camera Store Morocco`,
    template: `%s | ${BRAND.name}`,
  },
  description: defaultDescription,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: siteUrl }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "shopping",
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: "fr_MA",
    url: siteUrl,
    title: `${BRAND.name} — Camera Store Morocco`,
    description: defaultDescription,
    images: [{ url: getDefaultOgImage(), alt: `${BRAND.name} — moviecam.ma` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Camera Store Morocco`,
    description: defaultDescription,
    images: [getDefaultOgImage()],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
