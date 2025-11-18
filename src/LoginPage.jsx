import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username.trim() && password.trim()) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role: "user" })
        );
        alert("✅ Đăng nhập thành công!");
        navigate("/");
      } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left Image */}
        <div className="login-image">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="Login"
          />
        </div>

        {/* Right Form */}
        <div className="login-form-container">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Tài khoản</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tài khoản"
                required
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <div className="form-options">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{" "}
                Nhớ tôi
              </label>
              <a href="#">Quên mật khẩu?</a>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
            </button>

            <div className="divider">HOẶC</div>

            <button className="social-btn facebook">
              Tiếp tục với Facebook
            </button>
            <button className="social-btn google">Tiếp tục với Google</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
