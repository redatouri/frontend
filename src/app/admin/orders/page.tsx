"use client";

import { deleteAdminOrder, getAdminOrders } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import { formatDate, formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/stores/auth";
import type { OrderListItem } from "@/types/order";
import { RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function normalizeAdminOrder(order: OrderListItem): OrderListItem {
  const customer = order.customer;
  return {
    ...order,
    customer_name: customer?.full_name ?? order.customer_name,
    customer_phone: customer?.phone ?? order.customer_phone,
    customer_city: customer?.city ?? order.customer_city,
    customer_neighborhood: customer?.neighborhood ?? order.customer_neighborhood,
    customer_address: customer?.address_line ?? order.customer_address,
  };
}

function formatOrderProducts(items?: OrderListItem["items"]): string {
  if (!items?.length) return "—";
  return items
    .map((item) =>
      item.quantity > 1 ? `${item.product_name} ×${item.quantity}` : item.product_name,
    )
    .join(", ");
}

export default function AdminOrdersPage() {
  const { accessToken } = useAuthStore();
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    setError("");
    try {
      const data = await getAdminOrders(accessToken);
      setOrders(data.items.map(normalizeAdminOrder));
    } catch {
      setError("Impossible de charger les commandes");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleDelete = async (order: OrderListItem) => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      `Supprimer la commande ${order.order_number} ? Cette action est irréversible.`,
    );
    if (!confirmed) return;

    setDeletingId(order.id);
    try {
      await deleteAdminOrder(accessToken, order.id);
      setOrders((current) => current.filter((item) => item.id !== order.id));
      toast.success("Commande supprimée");
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Impossible de supprimer la commande";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Commandes</h1>
          <p className="text-sm text-zinc-500">Suivi des commandes COD</p>
        </div>
        <button
          type="button"
          onClick={loadOrders}
          className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
          aria-label="Actualiser"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>

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
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[1100px] text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
              <tr>
                <th className="px-4 py-3 font-medium">N° commande</th>
                <th className="px-4 py-3 font-medium">Produit(s)</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Téléphone</th>
                <th className="px-4 py-3 font-medium">Ville</th>
                <th className="px-4 py-3 font-medium">Quartier</th>
                <th className="px-4 py-3 font-medium">Adresse</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-3 font-mono text-zinc-900">{order.order_number}</td>
                  <td className="max-w-[220px] px-4 py-3 text-zinc-700">
                    {formatOrderProducts(order.items)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                    {formatDate(order.created_at, "fr")}
                  </td>
                  <td className="px-4 py-3">{order.customer_name ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3">{order.customer_phone ?? "—"}</td>
                  <td className="px-4 py-3">{order.customer_city ?? "—"}</td>
                  <td className="px-4 py-3">{order.customer_neighborhood ?? "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-zinc-700">{order.customer_address ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {formatPrice(order.total, "fr")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(order)}
                      disabled={deletingId === order.id}
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Supprimer ${order.order_number}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
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
