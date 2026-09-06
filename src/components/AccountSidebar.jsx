import "./AccountSidebar.css";

import {
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaInfo,
  FaBell,
  FaUser,
  FaUsers,
  FaSignOutAlt,
  FaCog
} from "react-icons/fa";

function AccountSidebar({
  isOpen,
  closeSidebar,
  onOpenLogin,
  onOpenRegister,
  onOpenProfile,
  tutor,
  onLogout
}) {
  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      <aside className={`account-sidebar ${isOpen ? "open" : ""}`}>

        <div className="sidebar-header">
          <h2>Conta</h2>

          <button onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">

          {tutor && (
            <>
              <div className="sidebar-user">

                <div className="sidebar-user-icon">
                  <FaUser />
                </div>

                <div>
                  <h3>Olá, {tutor.nometutor}!</h3>
                  <p>{tutor.emailtutor}</p>
                </div>

              </div>

              <button
                className="sidebar-btn"
                onClick={() => {
                  closeSidebar();
                  onOpenProfile();
                }}
              >
                <FaUser />
                Meu Perfil
              </button>

              <button className="sidebar-btn">
                <FaUsers />
                Minha Família
              </button>

              <button className="sidebar-btn">
                <FaUsers />
                Criar Família
              </button>

              <button className="sidebar-btn">
                <FaSignOutAlt />
                Sair da Família
              </button>

              <button className="sidebar-btn">
                <FaCog />
                Configurações
              </button>

              <button
                className="sidebar-btn logout-btn"
                onClick={() => {
                  closeSidebar();
                  onLogout();
                }}
              >
                <FaSignOutAlt />
                Sair da Conta
              </button>
            </>
          )}

          {!tutor && (
            <>
              <button
                className="sidebar-btn"
                onClick={() => {
                  closeSidebar();
                  onOpenLogin();
                }}
              >
                <FaSignInAlt />
                Entrar
              </button>

              <button
                className="sidebar-btn"
                onClick={() => {
                  closeSidebar();
                  onOpenRegister();
                }}
              >
                <FaUserPlus />
                Criar Conta
              </button>
            </>
          )}

          <button className="sidebar-btn">
            <FaInfo />
            Sobre o Pet Mon Go
          </button>

          <button className="sidebar-btn">
            <FaBell />
            Configurações de Notificações
          </button>

        </div>

      </aside>
    </>
  );
}

export default AccountSidebar;