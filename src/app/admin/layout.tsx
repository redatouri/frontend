import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin | Moviecam",
  description: "Moviecam administration",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
