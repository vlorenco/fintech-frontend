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
import { useState } from "react";

function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    console.log("logout...");
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        aria-label="Toggle sidebar"
        onClick={() => setOpen((s) => !s)}
      >
        ☰
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-avatar">F</div>
        <div>
          <div className="brand-text-title">Fintech</div>
          <div className="brand-text-sub">Gestão Financeira</div>
        </div>
      </div>

      <nav
        className="nav-section"
        onClick={() => {
          if (window.innerWidth < 768) setOpen(false);
        }}
      >
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
    </>
  );
}

export default Sidebar;
