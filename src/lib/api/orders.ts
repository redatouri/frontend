import { api } from "./client";
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
  const { apiAuth } = await import("./client");
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.page) search.set("page", String(params.page));
  const qs = search.toString();
  return apiAuth<OrderListResponse>(`/admin/orders${qs ? `?${qs}` : ""}`, token);
}
