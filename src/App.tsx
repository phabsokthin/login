import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Product from "./page/Product";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPage from "./page/product/ProductPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
