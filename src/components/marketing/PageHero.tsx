import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, subtitle, children, className }: PageHeroProps) {
  return (
    <section className={cn("border-b border-border bg-bg-elevated py-16 md:py-24", className)}>
      <div className="container-page">
        <ScrollReveal>
          {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
          <h1
            className={cn(
              "font-display text-display-lg font-semibold text-balance text-text-primary",
              eyebrow && "mt-4",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-body-lg text-text-secondary text-balance">{subtitle}</p>
          )}
          {children}
        </ScrollReveal>
      </div>
    </section>
  );
}
