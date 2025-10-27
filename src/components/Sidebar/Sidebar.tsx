import "./Sidebar.css";
import SidebarLink from "./SidebarLink";
import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  Target,
  LogOut,
} from "lucide-react";

function Sidebar() {
  function handleLogout() {
    console.log("logout...");
    // depois você coloca lógica real de logout aqui (limpar token, etc.)
  }

  return (
    <aside className="sidebar">
      {/* Topo: logo e nome */}
      <div className="brand">
        <div className="brand-avatar">F</div>
        <div>
          <div className="brand-text-title">Fintech</div>
          <div className="brand-text-sub">Gestão Financeira</div>
        </div>
      </div>

      {/* Links de navegação */}
      <nav className="nav-section">
        <SidebarLink
          to="/dashboard"
          icon={<LayoutDashboard className="small-icon" />}
          label="Dashboard"
        />

        <SidebarLink
          to="/recebimentos"
          icon={<ArrowDownCircle className="small-icon" />}
          label="Recebimentos"
        />

        <SidebarLink
          to="/despesas"
          icon={<ArrowUpCircle className="small-icon" />}
          label="Despesas"
        />

        <SidebarLink
          to="/metas"
          icon={<Target className="small-icon" />}
          label="Metas"
        />
      </nav>

      {/* Rodapé da sidebar */}
      <div className="nav-bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <span>Sair</span>
          <LogOut className="small-icon" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
