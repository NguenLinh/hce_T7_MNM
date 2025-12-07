import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const ListProducts_SP = ({ limit }) => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm nổi bật</h2>

      <div
        style={{
          display: "grid",
          width: "98%",
          margin: "0 auto",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {listProduct.slice(0, limit).map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/detail/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <h4
                style={{
                  margin: "10px 0 5px",
                  fontSize: "1rem",
                  minHeight: "40px",
                }}
              >
                {p.title}
              </h4>
              <p style={{ color: "#e63946", fontWeight: "bold", margin: "0" }}>
                ${p.price}
              </p>
              <small
                style={{
                  color: "#555",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
              </small>
            </div>

            <button
              onClick={(e) => handleAddToCart(e, p)}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#2c3e50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "10px",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2c3e50")
              }
            >
              🛒 Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;
