// src/Chitietsanpham.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "./data/product";
import { useCart } from "./CartContext"; 

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); 

  // Tìm sản phẩm theo id
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Không tìm thấy sản phẩm!</h2>
        <button onClick={() => navigate(-1)}>⬅ Quay lại</button>
      </div>
    );
  }

  // Hàm thêm vào giỏ hàng
  const handleAdd = () => {
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ⬅ Quay lại
      </button>

      <div style={{ display: "flex", gap: "30px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "280px",
            height: "280px",
            objectFit: "contain",
            borderRadius: "10px",
            background: "#f9f9f9",
            padding: "10px",
          }}
        />

        <div style={{ maxWidth: "500px" }}>
          <h2>{product.title}</h2>

          <p style={{ fontSize: "22px", fontWeight: "bold", color: "#e63946" }}>
            ${product.price}
          </p>

          <p>
            <strong>Loại:</strong> {product.category}
          </p>

          <p style={{ marginTop: "10px" }}>{product.description}</p>

          <p style={{ marginTop: "10px", color: "#555" }}>
            {product.rating?.rate} | ({product.rating?.count} đánh giá)
          </p>

          {/* Nút thêm vào giỏ */}
          <button
            onClick={handleAdd}
            style={{
              marginTop: "20px",
              padding: "12px 18px",
              backgroundColor: "#2c3e50",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1a252f")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2c3e50")
            }
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
