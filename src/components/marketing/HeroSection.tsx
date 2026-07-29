"use client";

import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageDesktop?: string;
  imageMobile?: string;
  imageAlt?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  imageDesktop = "/home/hero-desktop.webp",
  imageMobile = "/home/hero-mobile.webp",
  imageAlt = "Professional cinema camera equipment",
}: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative -mt-16 min-h-[100svh] w-full overflow-hidden bg-white pt-16 md:-mt-[72px] md:pt-[72px]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
      >
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
      </motion.div>

      <div className="cinematic-vignette pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(8_145_178_/_8%),transparent_45%)]" />

      <motion.div
        className="container-page relative flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-16 md:min-h-[calc(100svh-72px)] md:justify-center md:pb-24 md:pt-8"
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl lg:max-w-3xl"
        >
          <p className="editorial-eyebrow">Moviecam</p>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-balance text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-body-lg text-text-secondary text-balance">{subtitle}</p>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="inline-flex h-12 min-w-[160px] items-center justify-center bg-accent px-8 text-sm font-semibold tracking-wide text-on-accent transition-all hover:bg-accent-hover md:h-14 md:px-10"
            >
              {ctaPrimary}
            </Link>
            <Link
              href="/collections?sort=popular"
              className="inline-flex h-12 min-w-[160px] items-center justify-center border border-border bg-white/80 px-8 text-sm font-semibold tracking-wide text-text-primary shadow-sm backdrop-blur-sm transition-all hover:border-text-primary md:h-14 md:px-10"
            >
              {ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center md:flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-text-muted">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-border to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
