"use client";

import { getAdminOrders } from "@/lib/api/orders";
import { formatDate, formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/stores/auth";
import type { OrderListItem } from "@/types/order";
import { LogOut, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
  returned: "Retournée",
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const { accessToken, hasHydrated, clearTokens } = useAuthStore();
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    setError("");
    try {
      const data = await getAdminOrders(accessToken);
      setOrders(data.items);
    } catch {
      setError("Impossible de charger les commandes");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!accessToken) {
      router.replace("/admin/login");
      return;
    }
    loadOrders();
  }, [accessToken, hasHydrated, router, loadOrders]);

  const logout = () => {
    clearTokens();
    router.push("/admin/login");
  };

  if (!hasHydrated || !accessToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#E8B923] text-sm font-bold text-[#0D0D0F]">
              N
            </span>
            <div>
              <h1 className="font-semibold text-zinc-900">Commandes</h1>
              <p className="text-xs text-zinc-500">Moviecam Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadOrders}
              className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              aria-label="Actualiser"
            >
              <RefreshCw className="size-4" />
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
            >
              <LogOut className="size-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {loading ? (
          <p className="text-zinc-500">Chargement...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center">
            <p className="text-zinc-500">Aucune commande pour le moment.</p>
            <Link href="/fr" className="mt-4 inline-block text-sm text-[#B8860B] hover:underline">
              Voir la boutique
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <tr>
                  <th className="px-4 py-3 font-medium">N° commande</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Téléphone</th>
                  <th className="px-4 py-3 font-medium">Ville</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-3 font-mono text-zinc-900">{order.order_number}</td>
                    <td className="px-4 py-3 text-zinc-600">
                      {formatDate(order.created_at, "fr")}
                    </td>
                    <td className="px-4 py-3">{order.customer_name ?? "—"}</td>
                    <td className="px-4 py-3">{order.customer_phone ?? "—"}</td>
                    <td className="px-4 py-3">{order.customer_city ?? "—"}</td>
                    <td className="px-4 py-3 font-medium">
                      {formatPrice(order.total, "fr")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs">
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
