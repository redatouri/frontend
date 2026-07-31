"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface HeroMobileSlide {
  src: string;
  alt: string;
}

interface HeroMobileCarouselProps {
  slides: HeroMobileSlide[];
  intervalMs?: number;
}

export function HeroMobileCarousel({ slides, intervalMs = 3000 }: HeroMobileCarouselProps) {
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
    if (reduced || count <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [count, intervalMs, reduced]);

  if (count === 0) return null;

  return (
    <div className="relative h-full w-full md:hidden" aria-roledescription="carousel" aria-label="Hero">
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={slideIndex !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={slideIndex === 0}
            quality={95}
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
      ))}

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
