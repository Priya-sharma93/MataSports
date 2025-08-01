import { createContext, useContext, useState } from "react";
import cookies from "js-cookie";

const tokenContext = createContext();
const TokenProvider = tokenContext.Provider;

const TokenContext = ({ children }) => {
  // Initialize token state from cookies (if available)
  const [token, setToken] = useState(() => cookies.get("auth_token") || null);

  // Function to update the token state and store it in cookies
  const updateToken = (newToken) => {
    setToken(newToken);
    cookies.set("auth_token", newToken); // Save to cookies
  };

  return (
    <TokenProvider value={{ token, updateToken }}>{children}</TokenProvider>
  );
};
export const useTokenContext = () => useContext(tokenContext);
export default TokenContext;
