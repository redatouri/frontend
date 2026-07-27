"use client";

import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { getMediaUrl } from "@/lib/utils";
import type { ProductImage } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const active = sorted[activeIndex];
  const activeUrl = getMediaUrl(active?.url);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg-elevated">
        {activeUrl ? (
          <Image
            src={activeUrl}
            alt={active?.alt_text ?? productName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <ProductPlaceholder category="camera" label={productName} />
        )}
      </div>

      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {sorted.map((img, i) => {
            const url = getMediaUrl(img.url);
            return (
              <button
                key={`${img.url}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:size-20",
                  i === activeIndex ? "border-accent" : "border-border hover:border-accent/50",
                )}
              >
                {url ? (
                  <Image
                    src={url}
                    alt={img.alt_text ?? productName}
                    fill
                    className="object-cover"
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
    </div>
  );
}
