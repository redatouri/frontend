"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

interface AlternatingSectionProps {
  title: string;
  description: ReactNode;
  imageUrl?: string | null;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  imageAspect?: string;
  category?: "camera" | "audio" | "lighting" | "gimbal" | "lens" | "default";
  className?: string;
}

export function AlternatingSection({
  title,
  description,
  imageUrl,
  imageAlt,
  imagePosition = "left",
  imageAspect = "aspect-[4/3]",
  category = "default",
  className,
}: AlternatingSectionProps) {
  const imageBlock = (
    <div className={cn("relative overflow-hidden bg-bg-elevated", imageAspect)}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt ?? title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <ProductPlaceholder category={category} label={title} />
      )}
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h2 className="font-display text-display-lg text-balance font-semibold">{title}</h2>
      <div className="mt-4 text-body-lg text-text-secondary">{description}</div>
    </div>
  );

  return (
    <ScrollReveal className={cn("container-page section-padding", className)}>
      <div
        className={cn(
          "grid items-center gap-8 md:gap-12 lg:grid-cols-2",
          imagePosition === "right" && "lg:[&>*:first-child]:order-2",
        )}
      >
        {imageBlock}
        {textBlock}
      </div>
    </ScrollReveal>
  );
}
