import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Register from "./pages/register";
import Home from "./pages/home";
import Login from "./pages/login";

import TenantDetails from "./pages/tenant_details";
import ContextProvider from "./contexts/ContextProvider";
import Connection from "./pages/connection";

const App = () => {
  return (
    <Router>  {/* Router wraps everything */}
      <ContextProvider>  
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tenant-details" element={<TenantDetails />} />
          <Route path="/connection" element={<Connection />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
};

export default App;
