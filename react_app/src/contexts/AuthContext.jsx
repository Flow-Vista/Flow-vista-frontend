import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token"));
  const [tenant, setTenant] = useState(localStorage.getItem("tenant") || null);
  const navigate = useNavigate();

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        email,
        password,
      });

      if (!response.data.access) {
        throw new Error("Invalid server response: Missing access token");
      }

      const { access, refresh, message, redirect_to, tenant } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      if (tenant) {
        localStorage.setItem("tenant", tenant);
        setTenant(tenant);
      }

      setAccessToken(access);
      setRefreshToken(refresh);
      setUser({ email });

      return { message, redirect_to };
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("tenant");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setTenant(null);
    navigate("/login");
  };

  // Function to refresh token (renamed from refreshToken to refreshTokenHandler)
  const refreshTokenHandler = async () => {
    const refresh_token = localStorage.getItem("refresh_token"); // Get refresh token

    if (!refresh_token) {
      console.error("No refresh token found. Please log in again.");
      return null;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh: refresh_token,
      });

      localStorage.setItem("access_token", response.data.access);
      setAccessToken(response.data.access); // Update state
      return response.data.access;
    } catch (error) {
      console.error("Failed to refresh token:", error.response?.data || error.message);
      return null;
    }
  };

  // Axios interceptor to add access token & refresh if expired
  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use(
      async (config) => {
        let token = accessToken;

        if (!token) {
          token = await refreshTokenHandler(); // Use renamed function
        }

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshTokenHandler, tenant, setUser, setTenant }}>
      {children}
    </AuthContext.Provider>
  );
};
