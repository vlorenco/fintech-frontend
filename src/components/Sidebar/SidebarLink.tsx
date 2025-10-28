import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// Tipos das props que esse link recebe
type SidebarLinkProps = {
  to: string;     // rota destino (/dashboard, /metas, etc)
  icon: any;      // conteúdo do ícone (um <svg /> no nosso caso)
  label: string;  // texto visível do link
};

export default function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      // className dinâmica:
      // se o link estiver ativo, adiciona a classe "active"
      className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
    >
      <span className="icon">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
