import "./assets/css/main.css";
import anhlogo from "./assets/images//Ten-truong-do-1000x159.png";
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
    <html>
      <header>
        <div id="divheader" class="header1">
          <div id="banner" class="banner1">
            <div id="logo" class="logo1">
              <img src={anhlogo} width="548" />
            </div>
            <div id="divtimkiem" style={{ width: "300px" }}>
              Phần tìm kiếm
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
                Menu 3
              </a>
            </div>

            <div className="menubar-right">
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
      <body>
        <div id="container" class="container">
          <Outlet />
        </div>
      </body>
      <footer></footer>
    </html>
  );
};

export default Layout;
