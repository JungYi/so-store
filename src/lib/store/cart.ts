'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (id: string, size?: string) => void;
  updateQty: (id: string, size: string | undefined, qty: number) => void;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item, qty = 1) =>
        set((state) => {
          const idx = state.items.findIndex(
            (it) => it.id === item.id && it.size === item.size
          );
          if (idx >= 0) {
            const copy = [...state.items];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
            return { items: copy };
          }
          return { items: [...state.items, { ...item, qty }] };
        }),

      remove: (id, size) =>
        set((state) => ({
          items: state.items.filter((it) => !(it.id === id && it.size === size)),
        })),

      updateQty: (id, size, qty) =>
        set((state) => {
          if (qty <= 0) {
            return {
              items: state.items.filter((it) => !(it.id === id && it.size === size)),
            };
          }
          const copy = state.items.map((it) =>
            it.id === id && it.size === size ? { ...it, qty } : it
          );
          return { items: copy };
        }),

      subtotal: () => get().items.reduce((acc, it) => acc + it.price * it.qty, 0),
    }),
    {
      name: 'so-store-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      version: 1,
    }
  )
);