"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  imageSrc = "/home/hero-gimbal.webp",
  imageAlt = "Stabilisateur gimbal professionnel",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-black">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="container-page relative flex min-h-[92vh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Movie Cam · Agadir
          </p>
          <h1 className="mt-4 font-display text-display-xl font-bold text-balance text-white">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-body-lg leading-relaxed text-white/80">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/collections"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-opacity hover:opacity-90 md:h-14 md:px-10 md:text-base"
            >
              {ctaPrimary}
            </Link>
            <Link
              href="/collections?sort=popular"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/60 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:h-14 md:px-10 md:text-base"
            >
              {ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
