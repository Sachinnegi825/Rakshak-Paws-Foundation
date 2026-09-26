import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure Axios to always send HttpOnly cookies
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user info exists in localStorage (We don't store JWT here, just basic user info)
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post('/auth/login', { username, password });
      setAdmin(data.data);
      localStorage.setItem('adminInfo', JSON.stringify(data.data));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminInfo');
    // Technically, we should also call a /api/auth/logout endpoint to clear the HttpOnly cookie
    // But for now, we just clear the local state. Next request will fail if cookie expires.
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
