import React, { createContext, useContext, useEffect, useState } from "react";
import cookies from "js-cookie";

const authContext = createContext();
const AuthProvider = authContext.Provider;

const AuthContext = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state from cookies
    return cookies.get("isLoggedIn") === "true";
  });

  const [user, setUser] = useState(() => {
    // Optionally store user details in cookies
    const userData = cookies.get("user");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    // Sync `isLoggedIn` with cookies
    cookies.set("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    // Sync user data with cookies
    if (user) {
      cookies.set("user", JSON.stringify(user));
    } else {
      cookies.remove("user");
    }
  }, [user]);

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    cookies.remove("isLoggedIn");
    cookies.remove("user");
  };

  return (
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn, user, setUser, logout }}>
      {children}
    </AuthProvider>
  );
};

export const useAuthContext = () => useContext(authContext);

export default AuthContext;
