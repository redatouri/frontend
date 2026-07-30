"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  AdminProductListItem,
  getAdminProducts,
  updateAdminProduct,
} from "@/lib/api/admin-products";
import { formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/stores/auth";
import { Pencil, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const { accessToken } = useAuthStore();
  const [products, setProducts] = useState<AdminProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});

  const loadProducts = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    setError("");
    try {
      const data = await getAdminProducts(accessToken, { search: search || undefined, limit: 100 });
      setProducts(data.items);
      setPriceDrafts(
        Object.fromEntries(
          data.items.map((product) => [product.id, String(product.price ?? "")]),
        ),
      );
    } catch {
      setError("Impossible de charger les produits. Vérifiez que l'API backend est en ligne.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, search]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const savePrice = async (product: AdminProductListItem) => {
    if (!accessToken) return;
    const price = Number(priceDrafts[product.id]);
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Prix invalide");
      return;
    }

    setSavingId(product.id);
    try {
      const detail = await import("@/lib/api/admin-products").then((m) =>
        m.getAdminProduct(accessToken, product.id),
      );
      const defaultOffer = detail.offers.find((o) => o.is_default) ?? detail.offers[0];
      if (!defaultOffer) {
        toast.error("Offre introuvable");
        return;
      }

      await updateAdminProduct(accessToken, product.id, {
        offers: detail.offers.map((offer) =>
          offer.sku === defaultOffer.sku ? { ...offer, price } : offer,
        ),
      });
      toast.success("Prix mis à jour");
      await loadProducts();
    } catch {
      toast.error("Échec de la mise à jour");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Produits</h1>
          <p className="text-sm text-zinc-500">
            Modifiez les prix et ajoutez des produits sans redéployer
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/products/new"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#E8B923] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#0D0D0F] hover:opacity-90"
          >
            <Plus className="size-4" />
            Nouveau produit
          </Link>
          <button
            type="button"
            onClick={loadProducts}
            className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
            aria-label="Actualiser"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>
      </div>

      <div className="mb-4 max-w-md">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
          className="border-zinc-300 bg-white"
        />
      </div>

      {loading ? (
        <p className="text-zinc-500">Chargement...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
              <tr>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Prix (MAD)</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-zinc-900">{product.name}</p>
                    <p className="text-xs text-zinc-500">{product.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{product.category_name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={priceDrafts[product.id] ?? ""}
                        onChange={(e) =>
                          setPriceDrafts((prev) => ({
                            ...prev,
                            [product.id]: e.target.value,
                          }))
                        }
                        className="h-9 w-28 border-zinc-300 bg-white"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={savingId === product.id}
                        onClick={() => savePrice(product)}
                      >
                        OK
                      </Button>
                    </div>
                    {product.price != null && (
                      <p className="mt-1 text-xs text-zinc-400">
                        Actuel: {formatPrice(product.price, "fr")}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">{product.stock ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        product.is_active
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800"
                          : "rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600"
                      }
                    >
                      {product.is_active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="inline-flex items-center gap-1 text-[#B8860B] hover:underline"
                    >
                      <Pencil className="size-3.5" />
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
