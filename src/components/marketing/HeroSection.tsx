"use client";

import { HeroDesktopVideoCarousel, type HeroDesktopVideo } from "@/components/marketing/HeroDesktopVideoCarousel";
import { HeroMobileCarousel, type HeroMobileSlide } from "@/components/marketing/HeroMobileCarousel";
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
  mobileSlides?: HeroMobileSlide[];
  desktopVideos?: HeroDesktopVideo[];
  imageAlt?: string;
  /** When true, mobile slides include their own headline — hide overlay text below md */
  mobileImageHasCopy?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  imageDesktop,
  mobileSlides = [],
  desktopVideos = [],
  imageAlt = "Professional cinema camera equipment",
  mobileImageHasCopy = false,
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
  const hasMobileSlides = mobileSlides.length > 0;
  const hasDesktopVideos = desktopVideos.length > 0;
  const disableParallax = reduced || hasMobileSlides || hasDesktopVideos;
  const hideDesktopOverlay = hasDesktopVideos ? "md:hidden" : "";
  const hideDesktopText = hasDesktopVideos ? "md:hidden" : "";

  return (
    <section
      ref={ref}
      className="relative -mt-16 min-h-[100svh] w-full overflow-hidden bg-white pt-16 md:-mt-[72px] md:pt-[72px]"
    >
      {(hasMobileSlides || hasDesktopVideos || imageDesktop) && (
        <motion.div
          className="absolute inset-0 max-md:[transform:none]"
          style={disableParallax ? undefined : { y: imageY, scale: imageScale }}
        >
          {hasMobileSlides && <HeroMobileCarousel slides={mobileSlides} intervalMs={5000} />}
          {hasDesktopVideos && <HeroDesktopVideoCarousel videos={desktopVideos} />}
          {imageDesktop && (
            <Image
              src={imageDesktop}
              alt={imageAlt}
              fill
              priority
              className="hidden object-cover object-center md:block"
              sizes="100vw"
            />
          )}
        </motion.div>
      )}

      <div
        className={`cinematic-vignette pointer-events-none absolute inset-0 ${mobileImageHasCopy ? "max-md:hidden" : ""} ${hideDesktopOverlay}`}
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(8_145_178_/_8%),transparent_45%)] ${mobileImageHasCopy ? "max-md:hidden" : ""} ${hideDesktopOverlay}`}
      />

      <motion.div
        className={`container-page relative z-20 flex min-h-[calc(100svh-4rem)] flex-col pb-16 md:min-h-[calc(100svh-72px)] md:pb-28 md:pt-8 ${
          mobileImageHasCopy || hasDesktopVideos
            ? "justify-end max-md:items-center md:items-start"
            : "justify-end md:justify-center"
        }`}
        style={reduced || hasDesktopVideos ? undefined : { opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-2xl lg:max-w-3xl ${mobileImageHasCopy ? "max-md:text-center" : ""}`}
        >
          <p className={`editorial-eyebrow ${mobileImageHasCopy ? "max-md:hidden" : ""} ${hideDesktopText}`}>
            Moviecam
          </p>
          <h1
            className={`mt-5 font-display text-display-xl font-semibold text-balance text-text-primary ${mobileImageHasCopy ? "max-md:hidden" : ""} ${hideDesktopText}`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`mt-6 max-w-xl text-body-lg text-text-secondary text-balance ${mobileImageHasCopy ? "max-md:hidden" : ""} ${hideDesktopText}`}
            >
              {subtitle}
            </p>
          )}
          <div
            className={`flex flex-wrap gap-4 ${mobileImageHasCopy || hasDesktopVideos ? "mt-10 max-md:mt-0 max-md:justify-center md:mt-0" : "mt-10"}`}
          >
            <Link
              href="/collections"
              className="inline-flex h-12 min-w-[160px] items-center justify-center bg-[#DC2626] px-8 text-sm font-semibold tracking-wide text-white transition-all hover:bg-[#B91C1C] md:h-14 md:px-10"
            >
              {ctaPrimary}
            </Link>
            <Link
              href="/collections?sort=popular"
              className={`inline-flex h-12 min-w-[160px] items-center justify-center border px-8 text-sm font-semibold tracking-wide transition-all md:h-14 md:px-10 ${
                hasDesktopVideos
                  ? "border-white/80 bg-white text-text-primary shadow-md hover:border-white hover:bg-white"
                  : "border-border bg-white/80 text-text-primary shadow-sm backdrop-blur-sm hover:border-text-primary"
              }`}
            >
              {ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center ${hasDesktopVideos ? "max-md:flex" : "md:flex"}`}
      >
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
