import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

/**
 * Product entity
 * Keep this aligned with API response
 */

type ProductStore = {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
};


/**
 * Product Store
 * Manages product state including fetching from API
 */

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await res.json();

      set({ products: data, loading: false });
    } catch (err) {
      set({
        error: "Failed to load products",
        loading: false,
      });
    }
  },


}));
