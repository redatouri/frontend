"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface CategoryCarouselItem {
  slug: string;
  overlay: string;
  label: string;
  imageSrc: string | null;
  gradient: string;
}

interface CategoryCarouselProps {
  title?: string;
  items: CategoryCarouselItem[];
  className?: string;
}

function CategoryCard({ item }: { item: CategoryCarouselItem }) {
  const [imageError, setImageError] = useState(false);
  const showImage = item.imageSrc && !imageError;

  return (
    <Link
      href={`/collections/${item.slug}`}
      className="group block w-[132px] shrink-0 snap-start sm:w-[148px] md:w-[168px] lg:w-[180px]"
    >
      <div className="overflow-hidden border border-border bg-white transition-shadow group-hover:shadow-md">
        <div className="relative aspect-square overflow-hidden">
          {showImage ? (
            <Image
              src={item.imageSrc!}
              alt={item.label}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 132px, 180px"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={cn("absolute inset-0 bg-gradient-to-br", item.gradient)} />
          )}
          <div className="absolute inset-0 bg-black/35" />
          <p className="absolute inset-0 flex items-center justify-center px-2 text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs">
            {item.overlay}
          </p>
        </div>
        <div className="border-t border-border bg-white px-2 py-3 text-center">
          <p className="text-xs font-medium leading-snug text-text-primary sm:text-sm">
            {item.label}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function CategoryCarousel({ title, items, className }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  const updateDots = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth ?? 148;
    const gap = 12;
    const visible = Math.max(1, Math.floor(el.clientWidth / (cardWidth + gap)));
    const pages = Math.max(1, Math.ceil(items.length / visible));
    setDotCount(pages);

    const page = Math.round(el.scrollLeft / Math.max(el.scrollWidth - el.clientWidth, 1) * (pages - 1));
    setActiveDot(Math.min(Math.max(page, 0), pages - 1));
  }, [items.length]);

  useEffect(() => {
    updateDots();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateDots, { passive: true });
    window.addEventListener("resize", updateDots);
    return () => {
      el.removeEventListener("scroll", updateDots);
      window.removeEventListener("resize", updateDots);
    };
  }, [updateDots]);

  const scrollToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = dotCount <= 1 ? 0 : (maxScroll / (dotCount - 1)) * page;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className={cn("bg-bg-elevated py-8 md:py-10", className)}>
      <div className="container-page">
        <div className="mb-4 flex items-end justify-between gap-4 md:mb-5">
          {title ? (
            <h2 className="font-display text-lg font-bold text-text-primary md:text-xl">
              {title}
            </h2>
          ) : (
            <span />
          )}
          {dotCount > 1 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: dotCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={cn(
                    "size-2.5 rounded-full border transition-colors",
                    i === activeDot
                      ? "border-text-primary bg-text-primary"
                      : "border-text-muted bg-transparent hover:border-text-secondary",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory md:gap-4"
        >
          {items.map((item) => (
            <CategoryCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
