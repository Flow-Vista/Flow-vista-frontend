import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../css/home.css";  // Updated Home CSS

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <h1>🚀 Welcome to FlowVista</h1>
          <p>Your ultimate ETL solution for seamless CRM data integration.</p>

          <div className="card-container">
            <div className="card">
              <h2>📊 Analytics</h2>
              <p>View detailed insights and reports.</p>
            </div>
            
            <div className="card">
              <h2>🔧 Settings</h2>
              <p>Customize your ETL preferences.</p>
            </div>
            
            <div className="card">
              <h2>📁 Data</h2>
              <p>Manage and organize your CRM data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
