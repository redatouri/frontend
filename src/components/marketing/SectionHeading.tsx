import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "font-display text-display-lg font-semibold text-balance text-text-primary",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-body-lg text-text-secondary text-balance">{subtitle}</p>
      )}
    </div>
  );
}

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionShell({ children, className, id }: SectionShellProps) {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
