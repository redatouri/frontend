"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import {
  AdminCategoryOption,
  AdminProductDetail,
  deactivateAdminProduct,
  getAdminCategories,
  getAdminProduct,
  updateAdminProduct,
} from "@/lib/api/admin-products";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/stores/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<AdminProductDetail | null>(null);
  const [categories, setCategories] = useState<AdminCategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((value) => setProductId(value.id));
  }, [params]);

  useEffect(() => {
    if (!accessToken || !productId) return;
    Promise.all([getAdminProduct(accessToken, productId), getAdminCategories(accessToken)])
      .then(([productData, categoryData]) => {
        setProduct(productData);
        setCategories(categoryData);
      })
      .catch(() => toast.error("Impossible de charger le produit"))
      .finally(() => setLoading(false));
  }, [accessToken, productId]);

  if (loading || !product) {
    return <p className="text-zinc-500">Chargement...</p>;
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/admin/products" className="text-sm text-[#B8860B] hover:underline">
            ← Retour aux produits
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-900">Modifier le produit</h1>
          <p className="text-sm text-zinc-500">{product.slug}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            if (!accessToken || !productId) return;
            if (!confirm("Désactiver ce produit sur le site ?")) return;
            try {
              await deactivateAdminProduct(accessToken, productId);
              toast.success("Produit désactivé");
              router.push("/admin/products");
            } catch {
              toast.error("Échec");
            }
          }}
        >
          Désactiver
        </Button>
      </div>

      <ProductForm
        categories={categories}
        initial={product}
        submitLabel="Enregistrer"
        onSubmit={async (payload) => {
          if (!accessToken || !productId) return;
          try {
            await updateAdminProduct(accessToken, productId, payload);
            toast.success("Produit enregistré — visible sur le site immédiatement");
            const refreshed = await getAdminProduct(accessToken, productId);
            setProduct(refreshed);
          } catch {
            toast.error("Échec de l'enregistrement");
          }
        }}
      />
    </>
  );
}
