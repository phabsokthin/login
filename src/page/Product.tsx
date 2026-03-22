import { useState } from "react";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

function Product() {

  const navigate = useNavigate();
  const { products, createProduct, updateProduct, deleteProduct } =
    useProductStore();



  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    qty: 0,
    price: 0,
  });

  const [isEditing, setIsEditing] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing) {
      updateProduct(formData.id, formData);
    } else {
      createProduct({
        ...formData,
        id: Date.now(),
      });
      console.log(formData);
    }

    setFormData({ id: 0, name: "", qty: 0, price: 0 });
    setIsEditing(false);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
  };


    const handleLogout = () => {
    useAuthStore.getState().logout(); // Clear auth state
    navigate("/"); // Redirect to login page
  };

  

  return (
    <div style={{ padding: 20 }}>
      <h1>CRUD Product</h1>

      <button onClick={handleLogout}>Logout</button>
      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={formData.qty}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Product Name</th>
            <th style={thStyle}>Qty</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: 10 }}>
                No products
              </td>
            </tr>
          )}

          {products.map((item) => (
            <tr key={item.id}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.qty}</td>
              <td style={tdStyle}>${item.price}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleEdit(item)}
                  style={{ marginRight: 10 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(item.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: 8,
  textAlign: "left" as const,
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: 8,
};

export default Product;
