import { ScrollReveal } from "./ScrollReveal";
import { STORE } from "@/lib/store";
import { Instagram } from "lucide-react";

interface InstagramSectionProps {
  title: string;
  subtitle: string;
  cta: string;
}

export function InstagramSection({ title, subtitle, cta }: InstagramSectionProps) {
  return (
    <ScrollReveal className="border-t border-border bg-bg-elevated">
      <div className="container-page flex flex-col items-center px-6 py-20 text-center md:py-24">
        <span className="flex size-14 items-center justify-center rounded-full border border-border bg-bg-subtle">
          <Instagram className="size-7 text-cyan" aria-hidden />
        </span>
        <h2 className="mt-8 font-display text-display-lg font-semibold text-text-primary">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-text-secondary">{subtitle}</p>
        <a
          href={STORE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex h-12 items-center justify-center gap-2 border border-border px-8 text-sm font-semibold uppercase tracking-[0.12em] text-text-primary transition-all hover:border-accent hover:text-accent md:h-14 md:px-10"
        >
          <Instagram className="size-5" aria-hidden />
          {cta}
        </a>
        <p className="mt-4 text-sm font-medium text-text-muted">{STORE.instagramHandle}</p>
      </div>
    </ScrollReveal>
  );
}
