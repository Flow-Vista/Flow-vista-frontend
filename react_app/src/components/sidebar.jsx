import React from "react";
import "../css/sidebar.css";  
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      

      <ul>
        <li onClick={() => navigate("/dashboard")}>📊 Dashboard</li>
        <li onClick={() => navigate("/profile")}>👤 Profile</li>
        <li onClick={() => navigate("/settings")}>⚙️ Settings</li>
        <li onClick={() => navigate("/logout")}>🚪 Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
