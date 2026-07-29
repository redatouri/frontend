"use client";

import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ProductFaqProps {
  items: { question: string; answer: string }[];
}

export function ProductFaq({ items }: ProductFaqProps) {
  const t = useTranslations("product");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ScrollReveal className="container-page section-padding">
      <p className="editorial-eyebrow">{t("faqEyebrow")}</p>
      <h2 className="mt-4 font-display text-display-lg font-semibold">{t("faq")}</h2>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-start"
              >
                <span className="font-medium text-text-primary">{item.question}</span>
                <ChevronDown
                  className={cn("size-5 shrink-0 text-text-muted transition-transform", open && "rotate-180")}
                />
              </button>
              {open && (
                <p className="pb-5 text-sm leading-relaxed text-text-secondary">{item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
}
