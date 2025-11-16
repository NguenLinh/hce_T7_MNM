import { products } from "./data/product";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ListProducts = () => {
  const [listproduct, SetListProduct] = useState([]);

  //SetListProduct(products);

  //listproduct = products;

  const navigate = useNavigate();

  useEffect(() => {
    const LayDulieutuBackend = async () => {
      try {
        const res = await axios.get(
          "https://68f97a99ef8b2e621e7c302b.mockapi.io/products"
        );
        SetListProduct(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    LayDulieutuBackend();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          width: "100%",
        }}
      >
        {listproduct.map((motsp) => (
          <div
            key={motsp.id}
            onClick={() => navigate(`/sanpham/${motsp.id}`)}
            style={{
              height: "300px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={motsp.image}
              alt={motsp.title}
              style={{
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3 style={{ margin: "10px 0 5px", fontSize: "16px" }}>
              {motsp.title}
            </h3>
            <p style={{ margin: 0, fontWeight: "bold" }}>{motsp.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
