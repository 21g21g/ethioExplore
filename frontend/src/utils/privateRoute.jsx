import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice"; // Import your selector to check authentication status

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Get authentication status from Redux store

  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
