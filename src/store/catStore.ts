import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TCatStateStore = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  sumary: () => void;
  
};


export const useCatStore = create<TCatStateStore>()(

  immer((set, get) => ({
    cats: {
      bigCats: 0,
      smallCats: 0,
    },
    increaseBigCats: () => {
      set((state) => {
        state.cats.bigCats += 1; // mutable style
      });
    },
    increaseSmallCats: () => {
      set((state) => {
        state.cats.smallCats += 1; // mutable style
      });
    },

    sumary: () => {
      const totals = get().cats.bigCats + get().cats.smallCats;
     return "Total cats: " + totals;
    },
  }))
);
