import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { WishlistItem, WishlistItemProductSnapshot } from "@/src/types/wishlist.types";

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
  isWishlistOpen: boolean;
  isHydrated: boolean;
  
  // Actions
  setHydrated: () => void;
  setWishlistOpen: (open: boolean) => void;
  addItem: (product: WishlistItemProductSnapshot) => void;
  removeItem: (id: string) => void;
  toggleItem: (product: WishlistItemProductSnapshot) => void;
  clearWishlist: () => void;
  hasItem: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      isWishlistOpen: false,
      isHydrated: false,

      setHydrated: () => set({ isHydrated: true }),
      
      setWishlistOpen: (open) => set({ isWishlistOpen: open }),

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          
          if (existingItem) {
            return state; // Already in wishlist
          }

          const newItems = [...state.items, { 
            id: product.id, 
            product, 
            addedAt: new Date().toISOString() 
          }];
          
          return {
            items: newItems,
            totalItems: newItems.length,
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return {
            items: newItems,
            totalItems: newItems.length,
          };
        });
      },

      toggleItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          
          let newItems;
          if (existingItem) {
            newItems = state.items.filter((item) => item.id !== product.id);
          } else {
            newItems = [...state.items, { 
              id: product.id, 
              product, 
              addedAt: new Date().toISOString() 
            }];
          }

          return {
            items: newItems,
            totalItems: newItems.length,
          };
        });
      },

      clearWishlist: () => {
        set({
          items: [],
          totalItems: 0,
        });
      },

      hasItem: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: "nextjs-ecommerce-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
