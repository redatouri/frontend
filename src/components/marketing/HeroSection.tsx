"use client";

import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden gradient-hero">
      <div className="absolute inset-0 opacity-30">
        <ProductPlaceholder category="camera" className="h-full w-full" />
      </div>
      <div className="container-page relative flex min-h-[85vh] flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-display-xl font-bold text-balance">{title}</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-text-secondary">{subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-accent px-8 text-base font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
            >
              {ctaPrimary}
            </Link>
            <Link
              href="/collections"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-accent px-8 text-base font-semibold text-accent transition-colors hover:bg-accent-muted"
            >
              {ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
