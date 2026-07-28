"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";

const localeMeta: Record<
  Locale,
  { code: string; flagSrc: string; name: string }
> = {
  fr: { code: "FR", flagSrc: "/flags/flag-fr.webp", name: "Français" },
  ar: { code: "AR", flagSrc: "/flags/flag-ar.webp", name: "العربية" },
  en: { code: "EN", flagSrc: "/flags/flag-en.webp", name: "English" },
};

function LocaleFlag({ src, size = "sm" }: { src: string; size?: "sm" | "md" }) {
  const dimensions = size === "md" ? { w: 28, h: 19 } : { w: 24, h: 16 };

  return (
    <Image
      src={src}
      alt=""
      width={dimensions.w}
      height={dimensions.h}
      className="rounded-sm object-cover shadow-sm ring-1 ring-black/10"
      aria-hidden
    />
  );
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = localeMeta[locale];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-2.5 text-sm font-medium text-text-primary hover:bg-bg-subtle"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <LocaleFlag src={current.flagSrc} />
        <span>{current.code}</span>
        <ChevronDown className={cn("size-4 text-text-muted transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 top-full z-50 mt-1 min-w-[168px] overflow-hidden rounded-xl border border-border bg-bg-elevated py-1 shadow-xl"
        >
          {routing.locales.map((loc) => {
            const meta = localeMeta[loc];
            return (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={loc === locale}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm transition-colors hover:bg-bg-subtle",
                    loc === locale && "bg-bg-subtle font-semibold",
                  )}
                  onClick={() => {
                    router.replace(pathname, { locale: loc });
                    setOpen(false);
                  }}
                >
                  <LocaleFlag src={meta.flagSrc} size="md" />
                  <span className="flex flex-col">
                    <span>{meta.name}</span>
                    <span className="text-xs text-text-muted">{meta.code}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
