import "./assets/css/main.css";
import anhlogo from "./assets/images/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
              <a href="/menu3" className="menu-item">
                CONTACT
              </a>
            </div>

            <div className="menubar-right">
              <a
                href="/"
                className="login-link"
                style={{ paddingRight: "15px" }}
              >
                CART
              </a>

              {user ? (
                <>
                  <span className="username">👤 {user.username}</span>
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
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-column">
            <div class="footer-logo">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/animal-shelter/logo.png"
                alt="logo"
              />
            </div>
            <p>
              Fashion Store – Shop thời trang phong cách & chất lượng dành cho
              mọi lứa tuổi.
            </p>
            <div class="footer-social">
              <i class="fab fa-facebook"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-youtube"></i>
            </div>
          </div>

          <div class="footer-column" style={{ alignItems: "center" }}>
            <h3>Products</h3>
            <a href="#">Áo sơ mi</a>
            <a href="#">Vest</a>
            <a href="#">Quần jean</a>
            <a href="#">Áo dài</a>
            <a href="#">...</a>
          </div>

          <div class="footer-column">
            <h3>Hỗ trợ khách hàng</h3>
            <a href="#">Hướng dẫn mua hàng</a>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Chính sách giao hàng</a>
            <a href="#">Câu hỏi thường gặp</a>
          </div>

          <div class="footer-column">
            <h3>Contact</h3>
            <p>33 Vĩnh Viễn, Q10, TP.HCM</p>
            <p>📞 01 234 567 89</p>
            <p>✉ ylnguyen@shop.com</p>
          </div>
        </div>

        <div class="footer-copy">© 2020 Copyright: ylnguyen@shop.com</div>
      </footer>
    </>
  );
};

export default Layout;
