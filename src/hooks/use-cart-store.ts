import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartItemProductSnapshot } from "@/src/types/cart.types";

export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  isHydrated: boolean;
  lastOrder: {
    items: CartItem[];
    subtotal: number;
    total: number;
    shippingCost: number;
    tax: number;
    customerInfo?: CustomerInfo;
  } | null;
  
  // Actions
  setHydrated: () => void;
  setCartOpen: (open: boolean) => void;
  addItem: (product: CartItemProductSnapshot, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: (saveAsLastOrder?: boolean, shippingCost?: number, customerInfo?: CustomerInfo) => void;
}

const calculateTotals = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      subtotal: acc.subtotal + item.product.price * item.quantity,
    }),
    { totalItems: 0, subtotal: 0 }
  );
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      isCartOpen: false,
      isHydrated: false,
      lastOrder: null,

      setHydrated: () => set({ isHydrated: true }),
      
      setCartOpen: (open) => set({ isCartOpen: open }),

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          
          let newItems;
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { id: product.id, product, quantity }];
          }

          const totals = calculateTotals(newItems);
          
          return {
            items: newItems,
            ...totals,
            isCartOpen: true, // Auto open on add
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return {
            items: newItems,
            ...calculateTotals(newItems),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          // If quantity becomes 0 or less, we should just remove the item, 
          // but typically we enforce min=1 on UI. However, robust logic:
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.id !== id);
            return {
              items: newItems,
              ...calculateTotals(newItems),
            };
          }
          
          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          
          return {
            items: newItems,
            ...calculateTotals(newItems),
          };
        });
      },

      clearCart: (saveAsLastOrder = false, shippingCost = 0, customerInfo) => {
        set((state) => {
          const tax = state.subtotal * 0.1;
          return {
            lastOrder: saveAsLastOrder 
              ? { 
                  items: [...state.items], 
                  subtotal: state.subtotal,
                  total: state.subtotal + shippingCost + tax, // including mock tax
                  shippingCost,
                  tax,
                  customerInfo
                } 
              : state.lastOrder,
            items: [],
            totalItems: 0,
            subtotal: 0,
          };
        });
      },
    }),
    {
      name: "nextjs-ecommerce-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        lastOrder: state.lastOrder,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
