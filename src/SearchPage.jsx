import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // nhớ import supabase đã cấu hình
import { useCart } from "./CartContext";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .ilike("title", `%${query}%`) // tìm theo tên sản phẩm
          .order("id", { ascending: true });

        if (error) throw error;
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() !== "") {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  if (loading) return <p style={{ padding: 20 }}>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20, width: 1500 }}>
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      {products.length === 0 && <p>Không tìm thấy sản phẩm nào.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/detail/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h4>{p.title}</h4>
            <p style={{ color: "#e63946", fontWeight: "bold" }}>${p.price}</p>
            <button
              onClick={(e) => handleAddToCart(e, p)}
              style={{
                marginTop: "10px",
                padding: "8px",
                backgroundColor: "#2c3e50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              🛒 Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
