import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LazyDrawers } from "@/components/layout/LazyDrawers";
import { Providers } from "@/components/providers/Providers";
import { routing } from "@/i18n/routing";
import { getCategories } from "@/lib/api/categories";
import { getNavCategories } from "@/lib/nav-categories";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  Inter,
  Space_Grotesk,
  Tajawal,
} from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const categories = getNavCategories(await getCategories({ locale, top: true }));
  const fontClasses = [
    spaceGrotesk.variable,
    inter.variable,
    locale === "ar" ? tajawal.variable : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={fontClasses}
    >
      <head>
        <link rel="preconnect" href="https://api.moviecam.ma" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.moviecam.ma" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header categories={categories} />
            <main className="min-h-[60vh] pt-16 md:pt-[72px]">{children}</main>
            <Footer categories={categories} />
            <LazyDrawers />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
