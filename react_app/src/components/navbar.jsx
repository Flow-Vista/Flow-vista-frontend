import React from "react";
import "../css/navbar.css";  

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo"> Flow Vista</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <button className="btn-logout">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
