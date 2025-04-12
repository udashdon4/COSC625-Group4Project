import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();
const AUTO_LOGOUT_DELAY = 15 * 60 * 1000; // 15 minutes

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(storedId);
  }, []);

  const clearLogoutTimer = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
  };

  const startLogoutTimer = useCallback(() => {
    clearLogoutTimer();
    const timer = setTimeout(() => {
      logout();
      alert("You've been logged out due to inactivity.");
    }, AUTO_LOGOUT_DELAY);
    setLogoutTimer(timer);
  }, []);

  const login = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);
    startLogoutTimer(); // ✅ start countdown on login
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
    clearLogoutTimer();
  };

  // ✅ Reset timer on user activity
  useEffect(() => {
    if (!userId) return;

    const resetTimer = () => startLogoutTimer();
    const events = ["click", "keydown", "mousemove", "scroll"];

    events.forEach((e) => window.addEventListener(e, resetTimer));
    return () => events.forEach((e) => window.removeEventListener(e, resetTimer));
  }, [userId, startLogoutTimer]);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
