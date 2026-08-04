"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface HeroMobileSlide {
  src: string;
  alt: string;
}

interface HeroMobileCarouselProps {
  slides: HeroMobileSlide[];
  intervalMs?: number;
  /** When true, slide 0 is server-rendered elsewhere (LCP). */
  skipFirstSlide?: boolean;
  onIndexChange?: (index: number) => void;
}

export function HeroMobileCarousel({
  slides,
  intervalMs = 3000,
  skipFirstSlide = false,
  onIndexChange,
}: HeroMobileCarouselProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    if (reduced || count <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [count, intervalMs, reduced]);

  const loadedIndices = useMemo(() => {
    const next = (index + 1) % count;
    return new Set([skipFirstSlide ? -1 : 0, index, next].filter((i) => i >= 0));
  }, [count, index, skipFirstSlide]);

  if (count === 0) return null;

  return (
    <div className="relative h-full w-full md:hidden" aria-roledescription="carousel" aria-label="Hero">
      {slides.map((slide, slideIndex) => {
        const isActive = slideIndex === index;
        const shouldLoad = loadedIndices.has(slideIndex);
        const skipImage = skipFirstSlide && slideIndex === 0;

        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              isActive ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={!isActive}
          >
            {shouldLoad && !skipImage && (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                loading="lazy"
                quality={75}
                className="object-cover object-top"
                sizes="100vw"
              />
            )}
          </div>
        );
      })}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-36 z-10 flex justify-center gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(dotIndex)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                dotIndex === index ? "w-8 bg-text-primary" : "w-4 bg-text-primary/35",
              )}
              aria-label={`Go to slide ${dotIndex + 1}`}
              aria-current={dotIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
