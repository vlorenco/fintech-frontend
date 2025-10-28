import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// importa as páginas que são suas
import DashboardPage from "./pages/DashboardPage";
import RecebimentosPage from "./pages/RecebimentosPage";
import DespesasPage from "./pages/DespesasPage";
import MetasPage from "./pages/MetasPage";
// 
// import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Lado esquerdo: sidebar fixa */}
        <Sidebar />

        {/* Lado direito: conteúdo que muda conforme a rota */}
        <main className="main-content">
          <Routes>
            {/* redireciona "/" pra /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recebimentos" element={<RecebimentosPage />} />
            <Route path="/despesas" element={<DespesasPage />} />
            <Route path="/metas" element={<MetasPage />} />

            {/* rota de login vai entrar aqui*/}
            {/*
            <Route path="/login" element={<LoginPage />} />
            */}

            {/* fallback pra rota que não existe */}
            <Route path="*" element={<h1>Página não encontrada</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
