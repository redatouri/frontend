"use client";

import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";

interface InTheBoxProps {
  items: string[];
}

export function InTheBox({ items }: InTheBoxProps) {
  const t = useTranslations("product");

  if (items.length === 0) return null;

  return (
    <ScrollReveal className="container-page pb-12">
      <p className="editorial-eyebrow">{t("inTheBoxEyebrow")}</p>
      <h2 className="mt-4 font-display text-2xl font-semibold">{t("inTheBox")}</h2>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 border border-border bg-bg-elevated px-4 py-3.5 text-sm text-text-primary"
          >
            <Package className="size-4 shrink-0 text-cyan" strokeWidth={1.5} />
            {item}
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}
