"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  serviceId: string;
  packageId: string;
  title: string;
  duration: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  selectedVariants?: {
    category: string;
    items: {
      name: string;
      price: number;
      variant?: string;
    }[];
  }[];
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalDiscount: () => number;
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
      items: [],
      
      addToCart: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },
      
      removeFromCart: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },
      
      updateCartItem: (id, updates) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      getTotalDiscount: () => {
        return get().items.reduce(
          (total, item) =>
            total + (item.originalPrice - item.price) * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }),
    { name: "CartStore" }
  )
);

export default useCartStore;
