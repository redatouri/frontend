"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import {
  createAdminProduct,
  getAdminCategories,
  AdminCategoryOption,
} from "@/lib/api/admin-products";
import { useAuthStore } from "@/lib/stores/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [categories, setCategories] = useState<AdminCategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    getAdminCategories(accessToken)
      .then(setCategories)
      .catch(() => toast.error("Impossible de charger les catégories"))
      .finally(() => setLoading(false));
  }, [accessToken]);

  if (loading) {
    return <p className="text-zinc-500">Chargement...</p>;
  }

  return (
    <>
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-[#B8860B] hover:underline">
          ← Retour aux produits
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">Nouveau produit</h1>
      </div>

      <ProductForm
        categories={categories}
        accessToken={accessToken}
        submitLabel="Créer le produit"
        onSubmit={async (payload) => {
          if (!accessToken) return;
          try {
            const product = await createAdminProduct(accessToken, payload);
            toast.success("Produit créé");
            router.push(`/admin/products/${product.id}/edit`);
          } catch {
            toast.error("Échec de la création");
          }
        }}
      />
    </>
  );
}
