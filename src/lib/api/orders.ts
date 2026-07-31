import { ApiError, api } from "./client";
import type {
  CreateOrderPayload,
  OrderDetail,
  OrderListResponse,
} from "@/types/order";

export async function createOrder(payload: CreateOrderPayload): Promise<OrderDetail> {
  return api<OrderDetail>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

export async function getOrderByNumber(orderNumber: string): Promise<OrderDetail | null> {
  try {
    return await api<OrderDetail>(`/orders/by-number/${orderNumber}`, {
      cache: "no-store",
    });
  } catch {
    return null;
  }
}

export async function submitContact(payload: {
  full_name: string;
  phone: string;
  email?: string;
  message: string;
  locale: string;
}): Promise<void> {
  await api("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

export async function getAdminOrders(
  token: string,
  params?: { status?: string; page?: number },
): Promise<OrderListResponse> {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.page) search.set("page", String(params.page));
  const qs = search.toString();

  const res = await fetch(`/api/admin-proxy/admin/orders${qs ? `?${qs}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    let body: { detail?: unknown; code?: string; message?: string } | undefined;
    try {
      body = await res.json();
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res, body);
  }

  return res.json() as Promise<OrderListResponse>;
}

export async function deleteAdminOrder(token: string, orderId: string): Promise<void> {
  const res = await fetch(`/api/admin-proxy/admin/orders/${orderId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    let body: { detail?: unknown; code?: string; message?: string } | undefined;
    try {
      body = await res.json();
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res, body);
  }
}
