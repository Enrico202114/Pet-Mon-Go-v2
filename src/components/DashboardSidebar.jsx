
import {
  FaHome,
  FaPaw,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaHeart,
  FaUserCircle
} from "react-icons/fa";

import logo from "../assets/logo.png";

function DashboardSidebar({
  paginaAtiva = "",
  onHome,
  onOpenProfile,
  onPets,
  onFamily,
  onSettings,
  onLogout,
}) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand">
        <div className="dashboard-logo">
          <img src={logo} alt="Pet Mon Go" />
        </div>
      </div>

      <nav className="dashboard-nav">
        <button
          className={`dashboard-nav-item ${
            paginaAtiva === "inicio" ? "active" : ""
          }`}
          onClick={onHome}
        >
          <FaHome />
          <span>Início</span>
        </button>
    
        <button
            className={`dashboard-nav-item ${
                paginaAtiva === "perfil" ? "active" : ""
            }`}
            onClick={onOpenProfile}
            >
            <FaUserCircle />
            <span>Meu Perfil</span>
        </button>

        <button
          className={`dashboard-nav-item ${
            paginaAtiva === "pets" ? "active" : ""
          }`}
          onClick={onPets}
        >
          <FaPaw />
          <span>Meus Pets</span>
        </button>

        <button
          className={`dashboard-nav-item ${
            paginaAtiva === "familia" ? "active" : ""
          }`}
          onClick={onFamily}
        >
          <FaUsers />
          <span>Família</span>
        </button>

        <button
          className={`dashboard-nav-item ${
            paginaAtiva === "configuracoes" ? "active" : ""
          }`}
          onClick={onSettings}
        >
          <FaCog />
          <span>Configurações</span>
        </button>
      </nav>

      <div className="dashboard-sidebar-bottom">
        <div className="dashboard-sidebar-message">
          <FaHeart />
          <p>
            Cuidar de quem você ama ficou mais simples.
          </p>
        </div>

        <button
          className="dashboard-logout"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          <span>Sair da conta</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
