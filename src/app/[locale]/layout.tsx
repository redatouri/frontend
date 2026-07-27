import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/providers/Providers";
import { routing } from "@/i18n/routing";
import { getCategories } from "@/lib/api/categories";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  JetBrains_Mono,
  Open_Sans,
  Tajawal,
} from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
  const categories = await getCategories({ locale, top: true });

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${openSans.variable} ${tajawal.variable} ${jetbrains.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header categories={categories} />
            <main className="min-h-[60vh]">{children}</main>
            <Footer categories={categories} />
            <CartDrawer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
