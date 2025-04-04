import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser, setTenant } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/login/", formData);
      const data = response.data;

      if (!data || typeof data !== "object") {
        throw new Error("Invalid server response");
      }

      // Store tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      if (data.tenant) {
        localStorage.setItem("tenant", data.tenant);
        setTenant(data.tenant);
      }

      setUser({ token: data.access });

      Swal.fire({
        title: "Success!",
        text: data.message || "Login successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        setLoading(false);
        navigate(data.redirect_to === "home" ? "/home" : "/tenant-details", {
          state: { tenant: data.tenant || null },
        });
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Login failed. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });

      setError(error.response?.data?.error || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="main">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="register-container">
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have an account?
            <span style={{ color: "#4caf50", cursor: "pointer" }} onClick={() => navigate("/register")}>
              {" "}Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
