"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

interface AlternatingSectionProps {
  title: string;
  description: ReactNode;
  eyebrow?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  imageAspect?: string;
  imageShape?: "default" | "circle";
  category?: "camera" | "audio" | "lighting" | "gimbal" | "lens" | "default";
  variant?: "default" | "editorial";
  className?: string;
}

export function AlternatingSection({
  title,
  description,
  eyebrow,
  imageUrl,
  imageAlt,
  imagePosition = "left",
  imageAspect = "aspect-[4/3]",
  imageShape = "default",
  category = "default",
  variant = "default",
  className,
}: AlternatingSectionProps) {
  const isEditorial = variant === "editorial";

  const imageBlock = (
    <div
      className={cn(
        "relative overflow-hidden bg-bg-elevated",
        imageShape === "circle" && "rounded-full",
        isEditorial &&
          imageShape === "circle" &&
          "shadow-[0_24px_60px_-16px_rgb(0_0_0_/_14%)] ring-1 ring-border/80",
        imageAspect,
      )}
    >
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

  const textBlock = isEditorial ? (
    <div className="relative flex flex-col justify-center lg:ps-2">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-6 -z-10 rounded-2xl bg-gradient-to-br from-bg-subtle/90 via-bg-primary/40 to-cyan/5 md:-inset-x-6"
      />
      {eyebrow ? <p className="editorial-eyebrow">{eyebrow}</p> : null}
      <h2 className="editorial-story-title mt-4 font-display text-display-lg text-balance font-semibold tracking-tight text-text-primary">
        {title}
      </h2>
      <div className="premium-divider my-6 max-w-16" />
      <div className="space-y-0">{description}</div>
    </div>
  ) : (
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
