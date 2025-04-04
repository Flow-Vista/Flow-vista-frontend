import React from "react";
import "../css/navbar.css";  
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await axios.post(
            "http://localhost:8000/logout/",
            {},
            {
                withCredentials: true,  
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                }
            }
        );

        localStorage.removeItem("authToken");
        navigate("/login");
    } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
    }
};

  return (
    <div className="navbar">
      <div className="logo"> Flow Vista</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;