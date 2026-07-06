
import api from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    alert("Please enter Email and Password");
    return;
  }

  try {
    const response = await api.post("/auth/login", {
  email: form.email,
  password: form.password,
});

    console.log(response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    alert("Login Successful");

    // If Super Admin, skip OTP and go directly to dashboard
    if (response.data.user?.isSuperAdmin) {
      navigate("/");
    } else {
      navigate("/otp");
    }


    
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="brand">

          <h1>SITHAFAL</h1>

          <p>
            Office Password Management System
          </p>

        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>

          <p>
            Sign in to continue
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">

              <FaEnvelope className="icon" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <FaLock className="icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />

              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            <div className="remember">

              <label>

                <input type="checkbox" />

                Remember Me

              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>

            <button className="login-btn">

              Sign In

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}