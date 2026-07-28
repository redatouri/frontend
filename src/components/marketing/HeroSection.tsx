"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageDesktop?: string;
  imageMobile?: string;
  imageAlt?: string;
}

export function HeroSection({
  title,
  ctaPrimary,
  ctaSecondary,
  imageDesktop = "/home/hero-desktop.webp",
  imageMobile = "/home/hero-mobile.webp",
  imageAlt = "Vidéaste professionnel en tournage sur les pistes",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-sky-100 md:min-h-[92vh]">
      <Image
        src={imageMobile}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center md:hidden"
        sizes="100vw"
      />
      <Image
        src={imageDesktop}
        alt={imageAlt}
        fill
        priority
        className="hidden object-cover object-center md:block"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 w-[min(100%,42rem)] bg-gradient-to-r from-white/85 via-white/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/70 to-transparent md:hidden" />

      <div className="container-page relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28 md:min-h-[92vh] md:justify-center md:pb-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg md:max-w-xl"
        >
          <h1 className="font-display text-display-lg font-bold text-balance text-text-primary md:text-[clamp(1.875rem,3.2vw,2.625rem)]">
            {title}
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/collections"
              className="inline-flex h-12 items-center justify-center rounded-full bg-text-primary px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:h-14 md:px-10 md:text-base"
            >
              {ctaPrimary}
            </Link>
            <Link
              href="/collections?sort=popular"
              className="inline-flex h-12 items-center justify-center rounded-full border border-text-primary/30 bg-white/80 px-8 text-sm font-semibold text-text-primary transition-colors hover:bg-white md:h-14 md:px-10 md:text-base"
            >
              {ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
