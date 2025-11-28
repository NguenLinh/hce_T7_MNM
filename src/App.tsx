import "./styles.css";

// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import ListProducts from "./ListProducts";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Trang2 from "./Trang2";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//@ts-ignore
import LoginPage from "./LoginPage";
//@ts-ignore
import LogoutPage from "./LogoutPage";
//@ts-ignore
import ProtectedRoute from "./ProtectedRoute";
//@ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
//@ts-ignore
import EditProduct from "./EditProduct";

// ⭐ GIỎ HÀNG
import { CartProvider } from "./CartContext";
// @ts-ignore
import CartPage from "./CartPage";

// ⭐ CHAT AI (nếu có)
import ChatPage from "./ChatPage";

export default function App() {
  return (
    // ⭐⭐⭐ BỌC TOÀN BỘ ỨNG DỤNG BẰNG CartProvider
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout dùng chung */}
          <Route path="/" element={<Layout />}>
            {/* ⭐ Trang Home */}
            <Route index element={<Home />} />

            <Route path="trang1" element={<Trang1 />} />
            <Route path="trang2" element={<Trang2 />} />

            {/* ⭐ Trang chi tiết */}
            <Route path="sanpham/:id" element={<Chitietsanpham />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />

            {/* ⭐ GIỎ HÀNG */}
            <Route path="cart" element={<CartPage />} />

            {/* ⭐ CHAT AI */}
            <Route path="chat" element={<ChatPage />} />

            {/* ⭐ Login / Logout */}
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />

            {/* ⭐ ADMIN */}
            <Route
              path="admin/products"
              element={
                <ProtectedRoute>
                  <ListProducts_SP_Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
