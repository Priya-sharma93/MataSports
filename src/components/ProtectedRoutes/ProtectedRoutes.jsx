import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  const RoutesAccess = ["/", "/home", "/email-otp-verification"];

  if (isLoggedIn === null) {
    return null; // Or a loading spinner if needed
  }
  return isLoggedIn || RoutesAccess.includes(location.pathname) ? (
    children
  ) : (
    <Navigate to="/SignInForm" />
  );
};
export default ProtectedRoutes;
