import {
  FaHome,
  FaDog,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Sidebar.css";

function Sidebar({
  paginaAtiva = "",
  onHome,
  onDashboard,
  onOpenProfile,
  onPets,
  onFamily,
  onSettings,
  onLogout,
}) {
  const links = [
    { id: "inicio", label: "Início", icon: FaHome, action: onHome },
    { id: "painel", label: "Meu Painel", icon: FaTachometerAlt, action: onDashboard },
    { id: "perfil", label: "Meu Perfil", icon: FaUserCircle, action: onOpenProfile },
    { id: "pets", label: "Meus Pets", icon: FaDog, action: onPets },
    { id: "familia", label: "Família", icon: FaUsers, action: onFamily },
    { id: "configuracao", label: "Configuração", icon: FaCog, action: onSettings },
  ];

  return (
    <aside className="pet-sidebar">
      <div className="pet-sidebar-brand">
        <img src={logo} alt="Pet Mon Go" />
      </div>
      <nav className="pet-sidebar-nav" aria-label="Navegação principal">
        {links.map(({ id, label, icon: Icon, action }) => (
          <button
            key={id}
            type="button"
            className={`pet-sidebar-link ${paginaAtiva === id ? "active" : ""}`}
            aria-current={paginaAtiva === id ? "page" : undefined}
            onClick={action}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="pet-sidebar-bottom">
        <button type="button" className="pet-sidebar-logout" onClick={onLogout}>
          <FaSignOutAlt aria-hidden="true" />
          <span>Sair da conta</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
