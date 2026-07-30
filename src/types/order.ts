export interface OrderCustomer {
  full_name: string;
  phone: string;
  email?: string | null;
  city: string;
  neighborhood: string;
  address_line: string;
  locale: string;
}

export interface OrderLineItem {
  product_name: string;
  offer_label: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface OrderDetail {
  id: string;
  order_number: string;
  status: string;
  payment_method: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
  items: OrderLineItem[];
  created_at: string;
  customer?: OrderCustomer;
}

export interface OrderListItem {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  customer?: OrderCustomer;
  customer_name?: string;
  customer_phone?: string;
  customer_city?: string;
  customer_neighborhood?: string;
  customer_address?: string;
}

export interface OrderListResponse {
  items: OrderListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateOrderPayload {
  customer: OrderCustomer;
  items: { offer_id: string; quantity: number }[];
  notes?: string;
}
