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
    <ScrollReveal className="border-y border-border bg-[#f3f3f3]">
      <div className="container-page flex flex-col items-center px-6 py-14 text-center md:py-16">
        <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
          <Instagram className="size-7 text-text-primary" aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-display-lg font-semibold text-text-primary">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-text-secondary">{subtitle}</p>
        <a
          href={STORE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-text-primary px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:h-14 md:px-10 md:text-base"
        >
          <Instagram className="size-5" aria-hidden />
          {cta}
        </a>
        <p className="mt-4 text-sm font-medium text-text-muted">{STORE.instagramHandle}</p>
      </div>
    </ScrollReveal>
  );
}
