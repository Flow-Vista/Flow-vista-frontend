import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/tenant_details.css";

const TenantDetails = () => {
  const [formData, setFormData] = useState({
    tenantName: "",
    tenantAbbreviation: "",
    accessToken: "", // ✅ Kept "Access Token" field
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Unauthorized",
        text: "Please log in again.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => navigate("/login"));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let jwtToken = localStorage.getItem("token"); // Get JWT token
    if (!jwtToken) {
      console.error("No JWT token found! Redirecting to login.");
      Swal.fire("Unauthorized", "Login again to continue.", "error");
      navigate("/login");
      return;
    }
  
    const headers = {
      "Authorization": `Bearer ${jwtToken}`, // Ensure correct format
      "Content-Type": "application/json",
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8000/tenant-details",
        formData,
        { headers }
      );
  
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Tenant details saved successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
  
        setTimeout(() => {
          setLoading(false);
          navigate("/connection");
        }, 2000);
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
  
      if (error.response?.status === 401) {
        console.log("Token expired. Attempting refresh...");
        jwtToken = await refreshToken(); // Try refreshing the token
        if (jwtToken) {
          localStorage.setItem("token", jwtToken);
          return handleSubmit(e); // Retry the request
        } else {
          Swal.fire("Session Expired", "Please log in again.", "error");
          navigate("/login");
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.detail || "Failed to save tenant details.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
  
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

      <div className="tenant-container">
        <h2>Tenant Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tenant Name</label>
            <input
              type="text"
              name="tenantName"
              value={formData.tenantName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tenant Abbreviation</label>
            <input
              type="text"
              name="tenantAbbreviation"
              value={formData.tenantAbbreviation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Access Token</label>
            <input
              type="password"
              name="accessToken"
              value={formData.accessToken}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenantDetails;
