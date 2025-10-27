import { NavLink } from "react-router-dom";
import "./Sidebar.css";

type SidebarLinkProps = {
  to: string;
  icon: any; 
  label: string;
};

export default function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
    >
      <span className="icon">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
