"use client";

import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import { getWhatsAppUrl } from "@/lib/utils";
import type { OrderDetail } from "@/types/order";
import { CheckCircle2, Copy } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export function ThankYouClient({ order }: { order: OrderDetail | null }) {
  const t = useTranslations("thankYou");
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  if (!order) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-text-secondary">{t("notFound")}</p>
        <Link href="/" className="mt-4 inline-block text-accent hover:underline">
          Home
        </Link>
      </div>
    );
  }

  const copyOrder = async () => {
    await navigator.clipboard.writeText(order.order_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto size-16 text-success" />
        <h1 className="mt-6 font-display text-display-lg font-bold">{t("title")}</h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>

        <div className="mt-8 rounded-2xl border border-border bg-bg-elevated p-6">
          <p className="text-sm text-text-muted">{t("orderNumber")}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <p className="font-mono text-2xl font-bold text-accent">{order.order_number}</p>
            <button
              type="button"
              onClick={copyOrder}
              className="rounded-lg p-2 hover:bg-bg-subtle"
              aria-label={t("copy")}
            >
              <Copy className="size-4" />
            </button>
          </div>
          {copied && <p className="mt-1 text-xs text-success">{t("copied")}</p>}
        </div>

        <ul className="mt-6 space-y-2 text-start text-sm">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between border-b border-border py-2">
              <span className="text-text-secondary">
                {item.product_name} ({item.offer_label}) × {item.quantity}
              </span>
              <span>{formatPrice(item.line_total, locale)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-semibold">
          Total: {formatPrice(order.total, locale)}
        </p>

        <p className="mt-4 rounded-lg bg-accent-muted px-4 py-3 text-sm text-accent">
          {t("codPrepare", { total: formatPrice(order.total, locale) })}
        </p>
        <p className="mt-2 text-sm text-text-secondary">{t("deliveryEstimate")}</p>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={getWhatsAppUrl(
              `Bonjour Moviecam, question sur ma commande ${order.order_number}`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-accent text-sm font-semibold text-accent hover:bg-accent-muted"
          >
            {t("whatsappCta")}
          </a>
          <Link
            href="/collections"
            className="text-sm text-accent hover:underline"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </section>
  );
}
