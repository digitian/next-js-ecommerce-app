import { create } from "zustand";
import type { User } from "@/src/types/user.types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  reset: () => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  reset: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  hydrate: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/auth/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        set({
          user: json.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
