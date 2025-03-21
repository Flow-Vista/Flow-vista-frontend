import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";  // Reusing the same CSS
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8000/login/", formData);
      
      if (response.status === 200) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);  // Redirect to dashboard after login
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Login failed.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="main">
      <div className="register-container">  {/* Using same container styles */}
        <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}>
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" className="btn" >Login</button>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have an account? 
            <span 
              style={{ color: "#4caf50", cursor: "pointer" }} 
              onClick={() => navigate("/register")}
            >
              {" "}Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
