import { create } from "zustand";
import { productApi } from "../../api/product.api";
import type Product from "../../types/product";


/**
 * Store contract
 */
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, product: Omit<Product, "id">) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,
  
  /**
   * Fetch products from API
   */
  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const data = await productApi.getAll();
      set({
        products: data,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Unexpected error occurred",
        loading: false,
      });
    }
  },

  /**
   * create new product
   * - Optimistic update
   * @param product New product data without ID
   */

  createProduct: async (product: Omit<Product, "id">) => {
    const newProduct = await productApi.createProduct(product);
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },

  /**
   * Update product
   * - Optimistic update
   * @param id Product ID
   * @param product Updated product data
   */


  updateProduct: async (id: number, product: Omit<Product, "id">) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...product } : p
      ),
    }));
    await productApi.updateProduct(id, product);
  },

  /**
   * Delete product by id
   * - Optimistic update
   * @param id Product ID
   */
  deleteProduct: async (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
    await productApi.deleteById(id);
  },


}));
