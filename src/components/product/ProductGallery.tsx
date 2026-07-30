"use client";

import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { getMediaUrl } from "@/lib/utils";
import type { ProductImage } from "@/types/product";
import { Rotate3D, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  productSlug?: string;
}

type ViewMode = "photos" | "360";

export function ProductGallery({ images, productName, productSlug }: ProductGalleryProps) {
  const t = useTranslations("product");
  const sorted = [...images].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<ViewMode>("photos");
  const [zoomed, setZoomed] = useState(false);
  const active = sorted[activeIndex];
  const activeUrl = getMediaUrl(active?.url, productSlug);

  return (
    <div className="space-y-5">
      <div className="flex gap-2 border-b border-border">
        {(["photos", "360"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMode(tab)}
            className={cn(
              "px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
              mode === tab
                ? "border-b-2 border-accent text-text-primary"
                : "text-text-muted hover:text-text-secondary",
            )}
          >
            {tab === "photos" ? t("galleryPhotos") : t("gallery360")}
          </button>
        ))}
      </div>

      {mode === "photos" ? (
        <>
          <button
            type="button"
            onClick={() => setZoomed(!zoomed)}
            className="group relative aspect-[4/5] w-full overflow-hidden bg-white text-start"
          >
            {activeUrl ? (
              <Image
                src={activeUrl}
                alt={active?.alt_text ?? productName}
                fill
                className={cn(
                  "object-contain p-6 transition-transform duration-700 ease-out md:p-10",
                  zoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in",
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <ProductPlaceholder category="camera" label={productName} />
            )}
            <span className="absolute end-4 bottom-4 flex items-center gap-2 border border-border bg-white/95 px-3 py-2 text-xs font-medium uppercase tracking-wider text-text-primary shadow-sm backdrop-blur-sm">
              <ZoomIn className="size-3.5" />
              {zoomed ? t("galleryZoomOut") : t("galleryZoomIn")}
            </span>
          </button>

          {sorted.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {sorted.map((img, i) => {
                const url = getMediaUrl(img.url, productSlug);
                return (
                  <button
                    key={`${img.url}-${i}`}
                    type="button"
                    onClick={() => {
                      setActiveIndex(i);
                      setZoomed(false);
                    }}
                    className={cn(
                      "relative size-16 shrink-0 overflow-hidden border-2 bg-white transition-colors sm:size-20",
                      i === activeIndex ? "border-accent" : "border-border hover:border-accent/50",
                    )}
                  >
                    {url ? (
                      <Image
                        src={url}
                        alt={img.alt_text ?? productName}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    ) : (
                      <ProductPlaceholder category="camera" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center border border-dashed border-border bg-bg-subtle p-8 text-center">
          <Rotate3D className="size-12 text-cyan" strokeWidth={1.25} />
          <p className="mt-6 font-display text-xl font-semibold text-text-primary">
            {t("gallery360Title")}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
            {t("gallery360Desc")}
          </p>
          {activeUrl && (
            <div className="relative mt-8 size-48 overflow-hidden rounded-full border border-border opacity-60">
              <Image
                src={activeUrl}
                alt={productName}
                fill
                className="object-contain p-4"
                sizes="192px"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
