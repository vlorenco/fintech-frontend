import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// layout fixo
import Sidebar from "./components/Sidebar/Sidebar";

// páginas
import DashboardPage from "./pages/DashboardPage";
import RecebimentosPage from "./pages/RecebimentosPage";
import DespesasPage from "./pages/DespesasPage";
import MetasPage from "./pages/MetasPage";

// Se já existir uma página de erro personalizada, você pode importar assim:
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Sidebar fixa no lado esquerdo */}
        <Sidebar />

        {/* Área principal das rotas */}
        <main className="main-content">
          <Routes>
            {/* Redireciona "/" para "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Rotas principais do app */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recebimentos" element={<RecebimentosPage />} />
            <Route path="/despesas" element={<DespesasPage />} />
            <Route path="/metas" element={<MetasPage />} />
            
           
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
