import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardPage from "./pages/DashboardPage";
import RecebimentosPage from "./pages/RecebimentosPage";
import DespesasPage from "./pages/DespesasPage";
import MetasPage from "./pages/MetasPage";
import CategoriasPage from "./pages/CategoriasPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login - sem sidebar */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas principais - com sidebar e proteção */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="app-shell">
              <Sidebar />
              <main className="main-content">
                <DashboardPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/recebimentos" element={
          <ProtectedRoute>
            <div className="app-shell">
              <Sidebar />
              <main className="main-content">
                <RecebimentosPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/despesas" element={
          <ProtectedRoute>
            <div className="app-shell">
              <Sidebar />
              <main className="main-content">
                <DespesasPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/metas" element={
          <ProtectedRoute>
            <div className="app-shell">
              <Sidebar />
              <main className="main-content">
                <MetasPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/categorias" element={
          <ProtectedRoute>
            <div className="app-shell">
              <Sidebar />
              <main className="main-content">
                <CategoriasPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        {/* Página de erro para rotas não encontradas */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
