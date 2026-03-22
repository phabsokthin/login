import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TBearState = {
  bears: number;
  color: string;
  increasePopulation: () => void;
  removeAllBears: () => void;
  descreasePopulation: () => void;
  logout: () => void;
};

/*** Persist Storage */
export const useBearStore = create<TBearState>()(
  persist(
    (set) => ({
      bears: 0,
      color: 'red',
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
      descreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
      logout: () => set({ bears: 0 }),
    }),
    {
      name: "bear-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
