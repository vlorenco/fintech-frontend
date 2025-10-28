import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

// Import das páginas
import DashboardPage from "./pages/DashboardPage";
import RecebimentosPage from "./pages/RecebimentosPage";
import DespesasPage from "./pages/DespesasPage";
import MetasPage from "./pages/MetasPage";

export default function App() {
  return (
    // BrowserRouter habilita navegação SPA (sem recarregar a página inteira)
    <BrowserRouter>
      {/* app-wrapper = layout com duas colunas (sidebar + conteúdo) */}
      <div className="app-wrapper">
        {/* Sidebar fixa do lado esquerdo */}
        <Sidebar />

        {/* main-area = muda conforme a rota atual */}
        <main className="main-area">
          <Routes>
            {/* Rotas principais */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recebimentos" element={<RecebimentosPage />} />
            <Route path="/despesas" element={<DespesasPage />} />
            <Route path="/metas" element={<MetasPage />} />

            {/* Rota padrão: se acessar "/", redireciona pro dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* (Opcional) rota 404 */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
