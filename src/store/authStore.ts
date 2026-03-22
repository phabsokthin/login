import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  email: string;
  token: string;
  setAuth: (email: string, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      email: "",
      token: "",
      setAuth: (email, token) => set({ email, token }),
      logout: () => set({ email: "", token: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
