import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('airbnb_token');
    localStorage.removeItem('airbnb_user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  const login = useCallback((newToken, userData) => {
    localStorage.setItem('airbnb_token', newToken);
    localStorage.setItem('airbnb_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const updateUserRoles = useCallback((newRoles) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, roles: newRoles } : prev;
      if (updated) localStorage.setItem('airbnb_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('airbnb_token');
    const storedUser = localStorage.getItem('airbnb_user');
    if (!storedToken) return;
    try {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      const exp = payload.exp * 1000;
      if (Date.now() >= exp) {
        logout();
        return;
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    } catch (e) {
      logout();
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, updateUserRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
