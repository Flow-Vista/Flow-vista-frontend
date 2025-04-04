import React, { useState } from "react";
import axios from "axios";
import "../css/register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  
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
  
    // Debugging: Check formData before submitting
    console.log("Form Data before submitting:", formData);
  
    try {
      const response = await axios.post("http://localhost:8000/register/", formData);
  
      // Debugging: Check response
      console.log("API Response:", response);
  
      if (response.status === 201) {
        setSuccess("Registration successful!");
  
        Swal.fire({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
  
        // Direct navigation after success
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed.";
      console.error("Error during registration:", error);
      
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
  
      setError(errorMessage);
    }
  };
  

  return (
    <div className="main">
      <div className="register-container">
        <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}>
          Register
        </h2>

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

          <button type="submit" className="btn">Register</button>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Already have an account? 
            <span 
              style={{ color: "#4caf50", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              {" "}Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
