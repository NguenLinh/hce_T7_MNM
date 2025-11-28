import "./assets/css/main.css";
import anhlogo from "./assets/images/logo.png";
import avatar from "./assets/images/ava.png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// 🔥 Import giỏ hàng
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔥 Lấy giỏ hàng
  const { cartItems } = useCart();

  // 🔥 Tính tổng số lượng sản phẩm
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Header */}
      <header>
        <div id="divheader" className="header1">
          <div id="banner" className="banner1">
            <div className="banner-left"></div>

            <div id="logo" className="logo1">
              <img src={anhlogo} width="500" alt="Logo" />
            </div>

            <div id="divtimkiem" className="search-box">
              <input type="text" placeholder="Tìm sản phẩm..." />
              <button>Tìm</button>
            </div>
          </div>

          <div id="menubar" className="menubar">
            <div className="menubar-left">
              <a href="/admin/products" className="menu-item">
                ADMIN
              </a>
              <a href="/" className="menu-item">
                HOME
              </a>
              <a href="/trang1" className="menu-item">
                PRODUCT
              </a>
              <a href="/chat" className="menu-item">
                CHAT AI
              </a>
            </div>

            {/* ⭐⭐ GIỎ HÀNG ĐÃ ĐƯỢC THAY TỪ LAYOUT 1 ⭐⭐ */}
            <div
              className="menubar-right"
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              {/* 🔥 GIỎ HÀNG CÓ BADGE SỐ LƯỢNG */}
              <Link
                to="/cart"
                className="menu-item"
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                CART
                {totalQuantity > 0 && (
                  <span
                    style={{
                      backgroundColor: "white",
                      color: "#2c3e50",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {/* 🔥 LOGIN / LOGOUT */}
              {user ? (
                <>
                  <span className="username" style={{ color: "yellow" }}>
                    👤 {user.username}
                  </span>
                  <button className="logout-btn" onClick={handleLogout}>
                    LOGOUT
                  </button>
                </>
              ) : (
                <a href="/login" className="login-link">
                  LOGIN
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div id="container" className="container">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <div className="footer-logo">
              <img
                src={avatar}
                alt="Ava"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>

            <p>
              Fashion Store – Shop thời trang phong cách & chất lượng dành cho
              mọi lứa tuổi.
            </p>
            <div className="footer-social">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>

          <div className="footer-column" style={{ alignItems: "center" }}>
            <h3>Products</h3>
            <a href="#">Áo sơ mi</a>
            <a href="#">Vest</a>
            <a href="#">Quần jean</a>
            <a href="#">Áo dài</a>
            <a href="#">...</a>
          </div>

          <div className="footer-column">
            <h3>Hỗ trợ khách hàng</h3>
            <a href="#">Hướng dẫn mua hàng</a>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Chính sách giao hàng</a>
            <a href="#">Câu hỏi thường gặp</a>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <p>33 Vĩnh Viễn, Q10, TP.HCM</p>
            <p>📞 01 234 567 89</p>
            <p>✉ ylnguyen@shop.com</p>
          </div>
        </div>

        <div className="footer-copy">© 2020 Copyright: ylnguyen@shop.com</div>
      </footer>
    </>
  );
};

export default Layout;
