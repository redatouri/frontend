import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Moviecam",
    template: "%s | Moviecam",
  },
  description: "Professional audiovisual gear for Morocco.",
  openGraph: {
    type: "website",
    siteName: "Moviecam",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
