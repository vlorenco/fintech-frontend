import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
// Aqui fiz as importações das paginas
import DashboardPage from "./pages/DashboardPage";
import RecebimentosPage from "./pages/RecebimentosPage";
import DespesasPage from "./pages/DespesasPage";
import MetasPage from "./pages/MetasPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Sidebar />

        <main className="main-area">
          <Routes>
            {/* aqui fiz as rotas  para apontar pra uma página */}
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
