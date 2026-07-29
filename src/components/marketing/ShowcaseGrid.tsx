"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export interface ShowcaseTileData {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  learnMore: string;
  buyNow: string;
  learnHref: string;
  buyHref: string;
  imageSrc: string;
  imageAlt: string;
}

interface ShowcaseGridProps {
  tiles: ShowcaseTileData[];
}

function ShowcaseTile({ tile, index }: { tile: ShowcaseTileData; index: number }) {
  return (
    <ScrollReveal delay={index * 0.06} className="h-full">
      <article className="group relative flex h-full min-h-[min(72vh,640px)] flex-col overflow-hidden bg-[#f3f3f3] md:min-h-[min(50vh,520px)]">
        <div className="relative z-10 flex flex-col items-center px-6 pt-10 text-center md:px-8 md:pt-12">
          <p className="text-xs font-medium tracking-wide text-text-muted md:text-sm">
            {tile.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-text-primary md:text-[clamp(1.5rem,2.2vw,2rem)]">
            {tile.title}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary md:text-base">
            {tile.subtitle}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href={tile.learnHref}
              className="inline-flex items-center gap-1 text-sm font-semibold text-text-primary transition-opacity hover:opacity-70"
            >
              {tile.learnMore}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={tile.buyHref}
              className="inline-flex items-center gap-1 text-sm font-semibold text-text-primary transition-opacity hover:opacity-70"
            >
              {tile.buyNow}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="relative mt-auto flex min-h-[220px] flex-1 items-end justify-center px-4 pb-0 pt-6 sm:min-h-[280px] md:min-h-[240px] md:px-8">
          <div className="relative aspect-[4/3] w-full max-w-md md:max-w-lg">
            <Image
              src={tile.imageSrc}
              alt={tile.imageAlt}
              fill
              className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ShowcaseGrid({ tiles }: ShowcaseGridProps) {
  return (
    <section className="w-full bg-white">
      <div
        className={cn(
          "grid grid-cols-1 gap-px bg-white md:grid-cols-2",
        )}
      >
        {tiles.map((tile, index) => (
          <ShowcaseTile key={tile.id} tile={tile} index={index} />
        ))}
      </div>
    </section>
  );
}
