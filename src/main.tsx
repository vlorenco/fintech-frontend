import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // estilos globais/reset básicos

ReactDOM.createRoot(document.getElementById("root")!).render(
  // StrictMode ajuda a identificar problemas durante o desenvolvimento
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
