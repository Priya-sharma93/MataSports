import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./context/AuthContext/AuthContext.jsx";
import React from "react";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthContext>
        <App />
      </AuthContext>
    </React.StrictMode>
);
