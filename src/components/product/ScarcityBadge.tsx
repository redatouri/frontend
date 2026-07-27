"use client";

import { Badge } from "@/components/ui/Badge";
import { useTranslations } from "next-intl";

interface ScarcityBadgeProps {
  stock: number;
  className?: string;
}

export function ScarcityBadge({ stock, className }: ScarcityBadgeProps) {
  const t = useTranslations("product");

  if (stock <= 0) {
    return (
      <Badge variant="default" className={className}>
        {t("outOfStock")}
      </Badge>
    );
  }

  if (stock <= 5) {
    return (
      <Badge variant="scarcity" className={className}>
        🔥 {t("onlyLeft", { count: stock })}
      </Badge>
    );
  }

  return null;
}
