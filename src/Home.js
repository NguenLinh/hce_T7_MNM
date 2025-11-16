import React from "react";
import "./assets/css/home.css";

import banner from "./assets/images/anhbia.png";
import img1 from "./assets/images/image1.png";
import img2 from "./assets/images/image4.png";

import ListProducts_SP from "./ListProducts_SP";

export default function Home() {
  return (
    <div className="home-wrapper">
      {/* BANNER BACKGROUND */}
      <div
        className="banner-background"
        style={{ backgroundImage: `url(${banner})` }}
      ></div>

      {/* TEXT */}
      <div className="banner-text">
        <h2>HÃY THỂ HIỆN PHONG CÁCH</h2>
        <p>Chia sẻ phong cách của bạn với chúng tôi</p>
      </div>

      {/* 2 IMAGE */}
      <div className="two-images">
        <img src={img1} alt="Ảnh 1" />
        <img src={img2} alt="Ảnh 2" />
      </div>

      {/* PRODUCT LIST */}
      <div className="product-list">
        <ListProducts_SP />
      </div>
    </div>
  );
}
