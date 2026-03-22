import { useEffect, useState } from "react";
import type ProductType from "../../types/product";
import { useProductStore } from "../../store/product/product.store";

type ProductFormProps = {
  onClose: () => void;
  productDatas?: string;
};
export default function ProductForm({
  onClose,
  productDatas,
}: ProductFormProps) {
  /**
   * Form state
   * - Controlled inputs of fields
   */
  const [productData, setProductData] = useState<ProductType>({
    // id: 0 ,
    title: "",
    price: 0,
    category: "",
    image: "",
  });

  /**
   * update form state
   * - Controlled inputs of fields
   */

  useEffect(() => {
    if (productDatas) {
      const parsedData: ProductType = JSON.parse(productDatas);
      setProductData(parsedData);
    }
  }, [productDatas]);

  /**
   * Handle input changes
   * 
   * 
   * 
   * 
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };



  /**
   * Handle form submission
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (productData.id) {
      // Update existing product logic can be added here
      console.log("Update product:", productData);
      useProductStore.getState().updateProduct(productData.id, productData);
    } else {
      // Create new product
      console.log("Create product:", productData);
      useProductStore.getState().createProduct(productData);
    }

    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Product Form</h2>
        {/* <div>{productDatas}</div> */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{ backgroundColor: "snow", padding: "20px" }}
        >
          <div>
            <label className="block text-sm font-medium">Title1 234</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded px-3 py-2"
              required
              value={productData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Pric22222</label>
            <input
              type="number"
              name="price"
              className="w-full border rounded px-3 py-2"
              required
              value={productData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              className="w-full border rounded px-3 py-2"
              required
              value={productData.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Image</label>
            <input
              type="text"
              name="image"
              className="w-full border rounded px-3 py-2"
              required
              value={productData.image}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
