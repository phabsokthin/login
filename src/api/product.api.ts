import type Product from "../types/product";
import { BASE_URL } from "./apiUrl";

export const productApi = {
  /**
   * Fetch all products
   * - GET /products
   */
  async getAll(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  },

  /**
   * Create new product
   * - POST /products 
   */

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error("Failed to create product");
    }
    return res.json();
  },


  /**
   * Update product
   * - PUT /products/:id
   */
  async updateProduct(id: number, product: Omit<Product, "id">): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error("Failed to update product");
    }
    return res.json();
  },

  /**
   * Delete product by id
   * JSON Server returns empty body (204)
   */
  async deleteById(id: number) {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete product");
  },
};
