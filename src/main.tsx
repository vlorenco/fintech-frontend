import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "./contexts/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
