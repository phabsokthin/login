import { create } from "zustand";


type TfoodStoere = {
    fish: number
    addOneFish: () => void;
    removeOneFish: () => void;
    removeAllFish: () => void;
}


export const useFoodStore = create<TfoodStoere>()(
    (set) => ({
        fish: 0,
        addOneFish: () => set((state) => ({ fish: state.fish + 1 })),
        removeOneFish: () => set((state) => ({ fish: state.fish - 1 })),
        removeAllFish: () => set({ fish: 0 }),
    })
);