
import "./AccountSidebar.css";
import { FaTimes, FaSignInAlt, FaUserPlus, FaInfo, FaUser, FaDog, FaUsers, FaSignOutAlt, FaCog, FaHome } from "react-icons/fa";

function AccountSidebar({
  isOpen,
  closeSidebar,
  onOpenLogin,
  onOpenRegister,
  onOpenProfile,
  onOpenSettings,
  onOpenAbout,
  onOpenDashboard,
  onOpenPets,
  onOpenFamily,
  onCreateFamily,
  familia,
  tutor,
  onLogout,
}) {
  function executarAcao(acao) {
    closeSidebar?.();
    acao?.();
  }

  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      <aside
        className={`account-sidebar ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="sidebar-header">
          <h2>Conta</h2>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Fechar menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          {tutor ? (
            <>
              <div className="sidebar-user">
                <div className="sidebar-user-icon">
                  <FaUser />
                </div>

                <div>
                  <h3>Olá, {tutor.nometutor || tutor.nome || "Tutor"}!</h3>
                  <p>{tutor.emailtutor || tutor.email || ""}</p>
                </div>
              </div>

              <button
                type="button"
                className="sidebar-btn"
                onClick={() => executarAcao(onOpenDashboard)}
              >
                <FaHome />
                Meu Painel
              </button>

              <button
                type="button"
                className="sidebar-btn"
                onClick={() => executarAcao(onOpenProfile)}
              >
                <FaUser />
                Meu Perfil
              </button>

              <button
                type="button"
                className="sidebar-btn"
                onClick={() => executarAcao(onOpenPets)}
              >
                <FaDog />
                Meus Pets
              </button>

              <button
                type="button"
                className="sidebar-btn"
                onClick={() => executarAcao(onOpenFamily)}
              >
                <FaUsers />
                Minha Família
              </button>

              {!familia && (
                <button
                  type="button"
                  className="sidebar-btn"
                  onClick={() => executarAcao(onCreateFamily)}
                >
                  <FaUsers />
                  Criar Família
                </button>
              )}

              <button
                type="button"
                className="sidebar-btn"
                onClick={() => executarAcao(onOpenSettings)}
              >
                <FaCog />
                Configurações
              </button>

              <button
                type="button"
                className="sidebar-btn logout-btn"
                onClick={() => executarAcao(onLogout)}
              >
                <FaSignOutAlt />
                Sair da Conta
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="sidebar-btn"
                onClick={() => executarAcao(onOpenLogin)}
              >
                <FaSignInAlt />
                Entrar
              </button>

              <button
                type="button"
                className="sidebar-btn"
                onClick={() => executarAcao(onOpenRegister)}
              >
                <FaUserPlus />
                Criar Conta
              </button>
            </>
          )}

          <button
            type="button"
            className="sidebar-btn"
            onClick={() => executarAcao(onOpenAbout)}
          >
            <FaInfo />
            Sobre o Pet Mon Go
          </button>

        </div>
      </aside>
    </>
  );
}

export default AccountSidebar;
