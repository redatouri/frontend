"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function HeaderIconButton({
  children,
  onClick,
  label,
  count,
  variant = "dark",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  count?: number;
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex size-12 items-center justify-center rounded-full transition-colors",
        variant === "light"
          ? "text-white/90 hover:bg-white/10 hover:text-white"
          : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary",
        className,
      )}
      aria-label={label}
    >
      {children}
      {count != null && count > 0 && (
        <span className="absolute -end-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-on-accent">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
