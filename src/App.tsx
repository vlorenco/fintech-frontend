import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Sidebar from "./components/Sidebar/Sidebar";


import DashboardPage from "./pages/DashboardPage";
import RecebimentosPage from "./pages/RecebimentosPage";
import DespesasPage from "./pages/DespesasPage";
import MetasPage from "./pages/MetasPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        
        <Sidebar />

        
        <main className="main-content">
          <Routes>
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            
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
