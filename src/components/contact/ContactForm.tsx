"use client";

import { GoogleMapEmbed } from "@/components/contact/GoogleMapEmbed";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { submitContact } from "@/lib/api/orders";
import { STORE } from "@/lib/store";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      await submitContact({
        full_name: String(form.get("full_name")),
        phone: String(form.get("phone")),
        email: String(form.get("email") || "") || undefined,
        message: String(form.get("message")),
        locale,
      });
      toast.success(t("formSuccess"));
      e.currentTarget.reset();
    } catch {
      toast.error(t("formError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: MapPin, title: t("address"), value: t("addressValue") },
            {
              icon: Phone,
              title: t("phone"),
              value: STORE.phones.map((p) => p.display).join(" · "),
              href: `tel:${STORE.phoneTel}`,
            },
            {
              icon: Mail,
              title: t("email"),
              value: STORE.email,
              href: `mailto:${STORE.email}`,
            },
            { icon: Clock, title: t("hours"), value: t("hoursValue") },
          ].map(({ icon: Icon, title, value, href }) => (
            <div
              key={title}
              className="flex gap-4 border border-border bg-bg-elevated p-6"
            >
              <Icon className="size-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium">{title}</p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block text-sm text-accent hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-text-secondary">{value}</p>
                )}
              </div>
            </div>
          ))}

          <GoogleMapEmbed />

          <a
            href={STORE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-accent hover:underline"
          >
            {t("openMaps")}
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-border bg-bg-elevated p-6 md:p-10"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">{t("formName")}</Label>
              <Input id="full_name" name="full_name" required />
            </div>
            <div>
              <Label htmlFor="phone">{t("formPhone")}</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
            <div>
              <Label htmlFor="email">{t("formEmail")}</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div>
              <Label htmlFor="message">{t("formMessage")}</Label>
              <Textarea id="message" name="message" required />
            </div>
          </div>
          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {t("formSubmit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
