"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  AdminCategoryOption,
  AdminProductDetail,
  slugify,
  uploadAdminProductImage,
} from "@/lib/api/admin-products";
import { getApiBaseUrl } from "@/lib/utils";
import { ApiError } from "@/lib/api/client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type ProductFormProps = {
  categories: AdminCategoryOption[];
  accessToken?: string | null;
  initial?: AdminProductDetail;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  submitLabel: string;
};

function resolveAdminImageUrl(url: string): string {
  if (url.startsWith("http") || url.startsWith("/products/")) return url;
  if (url.startsWith("/media/")) return `${getApiBaseUrl()}${url}`;
  return url;
}

export function ProductForm({
  categories,
  accessToken,
  initial,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const frTranslation = initial?.translations.find((t) => t.locale === "fr");
  const defaultOffer = initial?.offers.find((o) => o.is_default) ?? initial?.offers[0];
  const defaultImage = initial?.images[0];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingImageUrl = useMemo(
    () => (defaultImage?.url ? resolveAdminImageUrl(defaultImage.url) : null),
    [defaultImage?.url],
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPreviewUrl(existingImageUrl);
    setSelectedFile(null);
  }, [existingImageUrl]);

  useEffect(() => {
    return () => {
      if (selectedFile && previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Choisissez une image (JPG, PNG ou WebP)");
      return;
    }

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("Session expirée, reconnectez-vous");
      return;
    }

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name"));
    const slug = String(form.get("slug") || slugify(name));
    const categoryId = String(form.get("category_id"));
    const price = Number(form.get("price"));
    const stock = Number(form.get("stock"));
    const sku = String(form.get("sku") || slug.toUpperCase().replace(/-/g, "_"));
    const isActive = form.get("is_active") === "on";

    setSubmitting(true);
    try {
      let imageUrl = defaultImage?.url ?? "";
      if (selectedFile) {
        try {
          const uploaded = await uploadAdminProductImage(accessToken, selectedFile, slug, 0);
          imageUrl = uploaded.url;
        } catch (error) {
          const message =
            error instanceof ApiError ? error.message : "Impossible de téléverser l'image";
          toast.error(message);
          return;
        }
      } else if (!imageUrl && !initial) {
        toast.error("Choisissez une image pour le produit");
        return;
      }

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
      setSelectedFile(null);
    } finally {
      setSubmitting(false);
    }
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

      <div className="space-y-3">
        <Label htmlFor="image_file">Image du produit</Label>
        {previewUrl ? (
          <div className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
            <Image
              src={previewUrl}
              alt="Aperçu produit"
              fill
              className="object-contain p-3"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex max-w-xs aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500">
            Aucune image
          </div>
        )}
        <input
          ref={fileInputRef}
          id="image_file"
          name="image_file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={submitting}
          >
            Choisir une image
          </Button>
          {selectedFile ? (
            <p className="self-center text-sm text-zinc-600">{selectedFile.name}</p>
          ) : defaultImage?.url ? (
            <p className="self-center text-sm text-zinc-500">Image actuelle conservée si vous n'en choisissez pas une nouvelle</p>
          ) : null}
        </div>
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

      <Button type="submit" disabled={submitting}>
        {submitting ? "Enregistrement..." : submitLabel}
      </Button>
    </form>
  );
}
