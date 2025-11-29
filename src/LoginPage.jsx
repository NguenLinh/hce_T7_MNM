import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // sẽ là email
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔐 Đăng nhập Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      alert("❌ Sai tài khoản hoặc mật khẩu!");
      setLoading(false);
      return;
    }

    // ⭐ Nếu nhớ tôi → lưu email
    if (remember) {
      localStorage.setItem("rememberEmail", username);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    alert("✅ Đăng nhập thành công!");
    setLoading(false);
    navigate("/");
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
              <label>Tài khoản (email)</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập email"
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

            <button type="button" className="social-btn facebook">
              Tiếp tục với Facebook
            </button>
            <button type="button" className="social-btn google">
              Tiếp tục với Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
