import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type Product = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type TProductStore = {
  products: Product[];
  createProduct: (product: Product) => void;
  updateProduct: (id: number, updated: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
};

export const useProductStore = create<TProductStore>()(
  persist(
    (set) => ({
      products: [],

      // CREATE
      createProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      // UPDATE
      updateProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        })),

      // DELETE
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "product-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
