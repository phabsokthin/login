import { useEffect, useState } from "react";
import { useProductStore } from "../../store/product/product.store";
import ProductForm from "./ProductForm";
import type Product from "../../types/product";

/**
 * ProductPage
 * - Page-level container
 * - Responsible for data lifecycle (fetch on mount)
 * - Delegates business logic to Zustand store
 */
export default function ProductPage() {
  /**
   * State selectors
   * variables
   */

  const [productForm, setProductForm] = useState(false);
  const [poductData, setProductData] = useState("");

  /**
   * Select only required state/actions
   * → avoids unnecessary re-renders
   */
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /**
   * * show product form
   */
  const hanldeClick = () => {
    setProductForm(true);
    setProductData("");
  };

  /**
   * close product form
   */
  const handleClose = () => {
    setProductForm(false);

  };

  /**
   * delete product handler
   * - Delegates to store action
   */
  const handleDelete = (id: number) => {
    // useProductStore.getState().deleteProduct(id);
    if (confirm("Are you sure to delete this product?")) {
      useProductStore.getState().deleteProduct(id);
    }
  };

  /**
   * Update product handler
   * - Delegates to store action
   */

  const handleUpdate = (data: Product) => {
    console.log("Update product:", data);
    setProductData(JSON.stringify(data));
    setProductForm(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <button onClick={hanldeClick}>Add New Product</button>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <article key={product.id} className="border rounded p-4 shadow-sm">
              <img
                width={200}
                src={product.image}
                alt={product.title}
                className="h-32 mx-auto object-contain"
                loading="lazy"
              />

              <h2 className="mt-2 text-sm font-medium line-clamp-2">
                {product.title}
              </h2>

              <p className="text-green-600 font-bold mt-1">${product.price}</p>
              <button onClick={() => handleDelete(product.id as number)}>
                Delete
              </button>
              <button onClick={() => handleUpdate(product)}>Update</button>
            </article>
          ))}
        </div>
      )}

      {productForm && (
        <ProductForm onClose={handleClose} productDatas={poductData} />
      )}
    </main>
  );
}
