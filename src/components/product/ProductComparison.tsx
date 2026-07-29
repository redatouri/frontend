"use client";

import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import type { ProductSpec } from "@/types/product";
import { useTranslations } from "next-intl";

interface ProductComparisonProps {
  specs: ProductSpec[];
  compareSpecs?: ProductSpec[];
  compareLabel?: string;
}

export function ProductComparison({
  specs,
  compareSpecs = [],
  compareLabel,
}: ProductComparisonProps) {
  const t = useTranslations("product");

  if (specs.length === 0) return null;

  const compareMap = new Map(compareSpecs.map((s) => [s.key, s.value]));
  const rows = specs.slice(0, 8);

  return (
    <ScrollReveal className="container-page section-padding">
      <p className="editorial-eyebrow">{t("comparisonEyebrow")}</p>
      <h2 className="mt-4 font-display text-display-lg font-semibold">{t("comparisonTitle")}</h2>
      <p className="mt-3 max-w-2xl text-text-secondary">{t("comparisonSubtitle")}</p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-4 text-start font-medium text-text-muted">{t("specs")}</th>
              <th className="px-4 py-4 text-start font-display text-base font-semibold text-text-primary">
                {t("comparisonThisProduct")}
              </th>
              {compareSpecs.length > 0 && (
                <th className="px-4 py-4 text-start font-medium text-text-muted">
                  {compareLabel ?? t("comparisonAlternative")}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((spec) => (
              <tr key={spec.key} className="border-b border-border/60">
                <td className="bg-bg-elevated px-4 py-3.5 font-medium text-text-secondary">
                  {spec.key}
                </td>
                <td className="px-4 py-3.5 text-text-primary">{spec.value}</td>
                {compareSpecs.length > 0 && (
                  <td className="px-4 py-3.5 text-text-muted">
                    {compareMap.get(spec.key) ?? "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  );
}
