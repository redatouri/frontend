"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  offerId: string;
  name: string;
  variantLabel: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (offerId: string) => void;
  updateQty: (offerId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.offerId === item.offerId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.offerId === item.offerId
                  ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, quantity: item.quantity ?? 1 },
            ],
          };
        });
      },
      removeItem: (offerId) =>
        set((state) => ({
          items: state.items.filter((i) => i.offerId !== offerId),
        })),
      updateQty: (offerId, qty) => {
        if (qty <= 0) {
          get().removeItem(offerId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.offerId === offerId ? { ...i, quantity: qty } : i,
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "moviecam-cart" },
  ),
);
