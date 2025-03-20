import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8000/register/", formData);
      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.password || "Registration failed.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="main">
    <div className="register-container">
        <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}>
        Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="btn">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
