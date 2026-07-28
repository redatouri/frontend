"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { createOrder } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import { MOROCCAN_CITIES } from "@/lib/cities";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/stores/cart";
import { getWhatsAppUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(1),
  neighborhood: z.string().min(1),
  address_line: z.string().min(5),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function CodCheckoutForm() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { city: "Casablanca" },
  });

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      toast.error(t("emptyCart"));
      return;
    }

    try {
      const order = await createOrder({
        customer: {
          full_name: data.full_name,
          phone: data.phone,
          email: data.email || null,
          city: data.city,
          neighborhood: data.neighborhood,
          address_line: data.address_line,
          locale,
        },
        items: items.map((i) => ({ offer_id: i.offerId, quantity: i.quantity })),
        notes: data.notes,
      });

      clearCart();
      router.push(`/thank-you?order=${order.order_number}`);
    } catch (err) {
      if (err instanceof ApiError && err.code === "STOCK_INSUFFICIENT") {
        toast.error(t("errorStock"));
      } else {
        toast.error(t("errorGeneric"));
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-text-secondary">{t("emptyCart")}</p>
        <Button className="mt-4" onClick={() => router.push("/collections")}>
          {t("backToShop")}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:col-span-3">
        <div>
          <Label htmlFor="full_name">{t("fullName")}</Label>
          <Input id="full_name" {...register("full_name")} />
          {errors.full_name && (
            <p className="mt-1 text-xs text-error">Required</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="06 XX XX XX XX"
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-xs text-error">Required</p>}
        </div>

        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" {...register("email")} />
        </div>

        <div>
          <Label htmlFor="city">{t("city")}</Label>
          <Select id="city" {...register("city")}>
            {MOROCCAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="neighborhood">{t("neighborhood")}</Label>
          <Input id="neighborhood" {...register("neighborhood")} />
          {errors.neighborhood && (
            <p className="mt-1 text-xs text-error">Required</p>
          )}
        </div>

        <div>
          <Label htmlFor="address_line">{t("address")}</Label>
          <Textarea id="address_line" {...register("address_line")} />
          {errors.address_line && (
            <p className="mt-1 text-xs text-error">Required</p>
          )}
        </div>

        <div>
          <Label htmlFor="notes">{t("notes")}</Label>
          <Textarea id="notes" {...register("notes")} />
        </div>

        <div className="space-y-2 rounded-xl border border-border bg-bg-elevated p-4 text-sm text-text-secondary">
          <p>🔒 {t("privacy")}</p>
          <p>💵 {t("codReminder")}</p>
          <a
            href={getWhatsAppUrl("Bonjour Moviecam, question sur ma commande.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-accent hover:underline"
          >
            {t("whatsappHelp")}
          </a>
        </div>

        <Button type="submit" className="hidden w-full lg:inline-flex" disabled={isSubmitting}>
          {t("submit")}
        </Button>
      </form>

      <aside className="lg:col-span-2">
        <div className="sticky top-24 rounded-2xl border border-border bg-bg-elevated p-6">
          <h2 className="font-display text-lg font-semibold">{t("summary")}</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.offerId} className="flex justify-between gap-4 text-sm">
                <span className="text-text-secondary">
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
            <span>Total</span>
            <span className="text-price">{formatPrice(total(), locale)}</span>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-bg-primary/95 p-4 backdrop-blur-md lg:hidden">
        <Button
          className="w-full"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {t("submit")}
        </Button>
      </div>
    </div>
  );
}
