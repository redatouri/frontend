"use client";

import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ShowcaseBannerProps {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  align?: "start" | "center" | "end";
  theme?: "dark" | "light";
  className?: string;
}

export function ShowcaseBanner({
  title,
  subtitle,
  cta,
  href,
  imageSrc,
  imageAlt,
  align = "start",
  theme = "dark",
  className,
}: ShowcaseBannerProps) {
  const alignClass = {
    start: "items-start text-start",
    center: "items-center text-center",
    end: "items-end text-end",
  }[align];

  const isDark = theme === "dark";

  return (
    <ScrollReveal className={cn("w-full", className)}>
      <section className="relative min-h-[88vh] w-full overflow-hidden md:min-h-[92vh]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className={cn(
            "absolute inset-0",
            isDark
              ? "bg-gradient-to-t from-black/80 via-black/25 to-black/10"
              : "bg-gradient-to-t from-white/90 via-white/30 to-transparent",
          )}
        />

        <div
          className={cn(
            "container-page relative flex min-h-[88vh] flex-col justify-end pb-14 pt-24 md:min-h-[92vh] md:pb-20 md:pt-28",
            alignClass,
          )}
        >
          <div className="max-w-xl md:max-w-2xl">
            <h2
              className={cn(
                "font-display text-display-lg font-bold text-balance md:text-[clamp(2rem,4vw,3.25rem)]",
                isDark ? "text-white" : "text-text-primary",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "mt-4 text-base leading-relaxed md:text-lg",
                isDark ? "text-white/75" : "text-text-secondary",
              )}
            >
              {subtitle}
            </p>
            <Link
              href={href}
              className={cn(
                "mt-8 inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-semibold transition-colors md:h-12 md:text-base",
                isDark
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-accent text-on-accent hover:bg-accent-hover",
              )}
            >
              {cta}
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
