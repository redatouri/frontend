"use client";

import { Link } from "@/i18n/navigation";
import { HeaderIconButton } from "./HeaderIconButton";
import { getWhatsAppUrl } from "@/lib/utils";
import { MessageCircle, Package, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface AccountMenuProps {
  variant?: "light" | "dark";
}

export function AccountMenu({ variant = "dark" }: AccountMenuProps) {
  const t = useTranslations("account");
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
    <div ref={ref} className="relative hidden sm:block">
      <HeaderIconButton
        label={t("title")}
        variant={variant}
        onClick={() => setOpen(!open)}
      >
        <User className="size-5" strokeWidth={1.5} />
      </HeaderIconButton>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-3 min-w-[240px] overflow-hidden border border-border bg-bg-elevated shadow-2xl">
          <div className="border-b border-border px-5 py-4">
            <p className="editorial-eyebrow text-text-muted">{t("title")}</p>
            <p className="mt-2 text-sm text-text-secondary">{t("subtitle")}</p>
          </div>
          <nav className="py-2">
            {[
              { href: "/contact", icon: Package, label: t("orders") },
              { href: "/contact", icon: MessageCircle, label: t("support") },
              { href: getWhatsAppUrl(), icon: MessageCircle, label: t("whatsapp"), external: true },
            ].map(({ href, icon: Icon, label, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
                >
                  <Icon className="size-4 text-cyan" />
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
                >
                  <Icon className="size-4 text-cyan" />
                  {label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
