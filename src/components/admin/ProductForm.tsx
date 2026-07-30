"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  AdminCategoryOption,
  AdminProductDetail,
  slugify,
} from "@/lib/api/admin-products";

type ProductFormProps = {
  categories: AdminCategoryOption[];
  initial?: AdminProductDetail;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  submitLabel: string;
};

export function ProductForm({
  categories,
  initial,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const frTranslation = initial?.translations.find((t) => t.locale === "fr");
  const defaultOffer = initial?.offers.find((o) => o.is_default) ?? initial?.offers[0];
  const defaultImage = initial?.images[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name"));
    const slug = String(form.get("slug") || slugify(name));
    const categoryId = String(form.get("category_id"));
    const price = Number(form.get("price"));
    const stock = Number(form.get("stock"));
    const sku = String(form.get("sku") || slug.toUpperCase().replace(/-/g, "_"));
    const imageUrl = String(form.get("image_url") || "");
    const isActive = form.get("is_active") === "on";

    const payload: Record<string, unknown> = {
      slug,
      category_id: categoryId,
      is_active: isActive,
      is_featured: initial?.is_featured ?? false,
      sort_order: initial?.sort_order ?? 0,
      translations: [
        {
          locale: "fr",
          name,
          headline: name,
        },
      ],
      offers: [
        {
          id: defaultOffer?.id,
          sku,
          label: defaultOffer?.label ?? "Neuf",
          price,
          stock,
          is_default: true,
        },
      ],
      images: imageUrl
        ? [{ url: imageUrl, alt_text: name, sort_order: 0 }]
        : (initial?.images ?? []),
      specs: initial?.specs?.length
        ? initial.specs
        : [{ locale: "fr", spec_key: "Garantie", spec_value: "Garantie constructeur" }],
      cross_sell_ids: initial?.cross_sell_ids ?? [],
    };

    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div>
        <Label htmlFor="name">Nom du produit</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={frTranslation?.name ?? ""}
          className="border-zinc-300 bg-white"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={initial?.slug ?? ""}
            placeholder="auto depuis le nom"
            className="border-zinc-300 bg-white"
          />
        </div>
        <div>
          <Label htmlFor="category_id">Catégorie</Label>
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={initial?.category_id ?? ""}
            className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm"
          >
            <option value="" disabled>
              Choisir une catégorie
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="price">Prix (MAD)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="1"
            step="1"
            required
            defaultValue={defaultOffer?.price ?? ""}
            className="border-zinc-300 bg-white"
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={defaultOffer?.stock ?? 6}
            className="border-zinc-300 bg-white"
          />
        </div>
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            defaultValue={defaultOffer?.sku ?? ""}
            className="border-zinc-300 bg-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image_url">Image (URL)</Label>
        <Input
          id="image_url"
          name="image_url"
          defaultValue={defaultImage?.url ?? ""}
          placeholder="/products/mon-produit-0.png ou /media/..."
          className="border-zinc-300 bg-white"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={initial?.is_active ?? true}
          className="size-4 rounded border-zinc-300"
        />
        Produit actif (visible sur le site)
      </label>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
