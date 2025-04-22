import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { userId } = useAuth();
  return userId ? children : <Navigate to="/COSC625-Group4Project/login" replace />;
};

export default PrivateRoute;
