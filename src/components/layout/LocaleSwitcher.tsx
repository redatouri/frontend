"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";

const labels: Record<Locale, string> = {
  fr: "FR",
  ar: "AR",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="flex h-10 items-center gap-1 rounded-lg px-2 text-sm font-medium text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {labels[locale]}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 top-full z-50 mt-1 min-w-[80px] overflow-hidden rounded-lg border border-border bg-bg-elevated py-1 shadow-xl"
        >
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                className={cn(
                  "block w-full px-4 py-2 text-start text-sm transition-colors hover:bg-bg-subtle",
                  loc === locale && "text-accent",
                )}
                onClick={() => {
                  router.replace(pathname, { locale: loc });
                  setOpen(false);
                }}
              >
                {labels[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
