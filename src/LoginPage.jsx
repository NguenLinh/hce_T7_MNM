import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/login.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // State cho đăng nhập
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // State cho đăng ký
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username.trim() && password.trim()) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role: "user" })
        );

        if (remember) {
          localStorage.setItem("rememberEmail", username);
        } else {
          localStorage.removeItem("rememberEmail");
        }

        alert("Đăng nhập thành công!");
        navigate("/");
      } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
      }
      setLoading(false);
    }, 800);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!regName || !regEmail || !regPassword) {
      alert("Vui lòng nhập đúng và đầy đủ thông tin!");
      return;
    }

    localStorage.setItem(
      "userData",
      JSON.stringify({ regName, regEmail, regPassword })
    );

    alert("🎉 Đăng ký thành công! Hãy đăng nhập.");
    setIsLogin(true); // quay về form login
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Ảnh bên trái */}
        <div className="login-image">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="Login"
          />
        </div>

        {/* FORM */}
        <div className="login-form-container">
          {/* TAB CHUYỂN FORM */}
          <div className="auth-tabs">
            <span
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Đăng nhập
            </span>
            <span
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Đăng ký
            </span>
          </div>

          {/* FORM ĐĂNG NHẬP */}
          {isLogin && (
            <form onSubmit={handleLogin} className="fadeIn">
              <h2>Đăng nhập</h2>

              <div className="form-group">
                <label>Tài khoản</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập email hoặc tên đăng nhập"
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
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>
          )}

          {/* FORM ĐĂNG KÝ */}
          {!isLogin && (
            <form onSubmit={handleRegister} className="fadeIn">
              <h2>Tạo tài khoản mới</h2>

              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nhập họ tên"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Tạo mật khẩu"
                  required
                />
              </div>

              <button type="submit">Đăng ký</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
