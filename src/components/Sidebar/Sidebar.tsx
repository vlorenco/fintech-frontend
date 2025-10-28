import "./Sidebar.css";
import SidebarLink from "./SidebarLink";
import {
  DashboardIcon,
  RecebimentosIcon,
  DespesasIcon,
  MetasIcon,
  LogoutIcon,
} from "./Icons";

import { useTheme } from "../../hooks/useTheme";

function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    console.log("logout...");
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-avatar">F</div>
        <div>
          <div className="brand-text-title">Fintech</div>
          <div className="brand-text-sub">Gestão Financeira</div>
        </div>
      </div>

      <nav className="nav-section">
        <SidebarLink
          to="/dashboard"
          icon={<DashboardIcon className="small-icon" />}
          label="Dashboard"
        />

        <SidebarLink
          to="/recebimentos"
          icon={<RecebimentosIcon className="small-icon" />}
          label="Recebimentos"
        />

        <SidebarLink
          to="/despesas"
          icon={<DespesasIcon className="small-icon" />}
          label="Despesas"
        />

        <SidebarLink
          to="/metas"
          icon={<MetasIcon className="small-icon" />}
          label="Metas"
        />
      </nav>

      <div className="nav-bottom">
        <button className="theme-btn" onClick={toggleTheme}>
          <span>{theme === "dark" ? "Tema claro ☀" : "Tema escuro 🌙"}</span>
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <span>Sair</span>
          <LogoutIcon className="small-icon" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
