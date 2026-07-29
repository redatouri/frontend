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
  subtitle?: string;
  items: CategoryCarouselItem[];
  className?: string;
}

function CategoryCard({ item }: { item: CategoryCarouselItem }) {
  const [imageError, setImageError] = useState(false);
  const showImage = item.imageSrc && !imageError;

  return (
    <Link
      href={`/collections/${item.slug}`}
      className="group block w-[148px] shrink-0 snap-start sm:w-[168px] md:w-[200px] lg:w-[220px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-subtle">
        {showImage ? (
          <Image
            src={item.imageSrc!}
            alt={item.label}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 768px) 148px, 220px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", item.gradient)} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan">
            {item.overlay}
          </p>
          <p className="mt-2 text-sm font-medium leading-snug text-white">{item.label}</p>
        </div>
      </div>
    </Link>
  );
}

export function CategoryCarousel({ title, subtitle, items, className }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  const updateDots = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth ?? 168;
    const gap = 16;
    const visible = Math.max(1, Math.floor(el.clientWidth / (cardWidth + gap)));
    const pages = Math.max(1, Math.ceil(items.length / visible));
    setDotCount(pages);

    const page = Math.round(
      el.scrollLeft / Math.max(el.scrollWidth - el.clientWidth, 1) * (pages - 1),
    );
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
    <section className={cn("section-padding bg-bg-elevated", className)}>
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            {title && (
              <h2 className="font-display text-display-lg font-semibold text-text-primary">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-xl text-text-secondary">{subtitle}</p>
            )}
          </div>
          {dotCount > 1 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: dotCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={cn(
                    "h-px w-8 transition-all duration-300",
                    i === activeDot ? "bg-accent" : "bg-border hover:bg-text-muted",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:gap-5"
        >
          {items.map((item) => (
            <CategoryCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
