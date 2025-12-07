import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const Trang1 = () => {
  const [listProduct, setListProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 16;

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

  // Tính toán sản phẩm hiển thị theo trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = listProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(listProduct.length / productsPerPage);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h2>Danh sách sản phẩm</h2>

      {/* Lưới sản phẩm */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
          width: "98%",
          margin: "0 auto",
        }}
      >
        {currentProducts.map((p) => (
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
                {p.rating_rate} | ({p.rating_count} đánh giá)
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
                (e.currentTarget.style.backgroundColor = "#1a252f")
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

      {/* PHÂN TRANG */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "5px",
              border: "1px solid #888",
              background: currentPage === i + 1 ? "#2c3e50" : "#fff",
              color: currentPage === i + 1 ? "#fff" : "#000",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Trang1;
