import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moviecam",
  description: "Professional camera and filmmaking gear for Morocco.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
