import "./Sidebar.css";
import SidebarLink from "./SidebarLink";

import {
  DashboardIcon,
  RecebimentosIcon,
  DespesasIcon,
  MetasIcon,
  LogoutIcon,
} from "./Icons";

function Sidebar() {
  function handleLogout() {
    console.log("logout...");
  }

  return (
    <aside className="sidebar">
      {/* Logo / nome do sistema */}
      <div className="brand">
        <div className="brand-avatar">F</div>
        <div>
          <div className="brand-text-title">Fintech</div>
          <div className="brand-text-sub">Gestão Financeira</div>
        </div>
      </div>

      {/* Navegação */}
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

      {/* Botão sair */}
      <div className="nav-bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <span>Sair</span>

          {/* Ícone de logout alinhado à direita */}
          <LogoutIcon className="small-icon" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
