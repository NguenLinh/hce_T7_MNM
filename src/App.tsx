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
//@ts-ignore
import SearchPage from "./SearchPage";

import { CartProvider } from "./CartContext";
// @ts-ignore
import CartPage from "./CartPage";
// @ts-ignore
import ChatPage from "./ChatPage";
// @ts-ignore
import Contact from "./Contact";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="trang1" element={<Trang1 />} />

            <Route path="/search" element={<SearchPage />} />

            <Route path="sanpham/:id" element={<Chitietsanpham />} />

            <Route path="/admin/edit/:id" element={<EditProduct />} />

            <Route path="cart" element={<CartPage />} />

            <Route path="chat" element={<ChatPage />} />

            <Route path="login" element={<LoginPage />} />

            <Route path="logout" element={<LogoutPage />} />

            <Route path="/contact" element={<Contact />} />
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
