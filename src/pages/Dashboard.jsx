
import {
  FaHome,
  FaPaw,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaSyringe,
  FaCalendarAlt,
  FaClipboardList,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Dashboard.css";

function Dashboard({
  tutor,
  onHome,
  onPets,
  onFamily,
  onSettings,
  onLogout,
}) {
  const nomeTutor =
    tutor?.nometutor || tutor?.nome || tutor?.name || "Tutor";

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">

          <div className="dashboard-logo">
            <img src={logo} alt="Pet Mon Go" />
          </div>
        </div>

        <nav className="dashboard-nav">
          <button
            className="dashboard-nav-item active"
            onClick={onHome}
          >
            <FaHome />
            <span>Início</span>
          </button>

          <button
            className="dashboard-nav-item"
            onClick={onPets}
          >
            <FaPaw />
            <span>Meus Pets</span>
          </button>

          <button
            className="dashboard-nav-item"
            onClick={onFamily}
          >
            <FaUsers />
            <span>Família</span>
          </button>

          <button
            className="dashboard-nav-item"
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

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Meu Painel</h1>
            <p>
              Olá, {nomeTutor}! Vamos cuidar bem dos seus pets?
            </p>
          </div>

          <div className="dashboard-avatar">
            <FaPaw />
          </div>
        </header>

        <section className="dashboard-welcome">
          <div className="dashboard-welcome-content">
            <span>UM DIA DE CUIDADOS</span>
            <h2>Todo carinho merece organização.</h2>

            <button
              className="dashboard-primary-button"
              onClick={onPets}
            >
              Ver meus pets
              <FaArrowRight />
            </button>
          </div>

          <div className="dashboard-welcome-icon">
            <FaPaw />
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>Resumo dos cuidados</h2>
            </div>
          </div>

          <div className="dashboard-summary-grid">
            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon pets-icon">
                <FaPaw />
              </div>
              <div>
                <span>Meus pets</span>
                <p>Consulte seus animais cadastrados.</p>
              </div>
              <button
                aria-label="Acessar meus pets"
                onClick={onPets}
              >
                <FaArrowRight />
              </button>
            </article>

            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon routine-icon">
                <FaClipboardList />
              </div>
              <div>
                <span>Rotinas</span>
                <p>Organize os cuidados diários.</p>
              </div>
              <FaArrowRight className="dashboard-card-arrow" />
            </article>

            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon vaccine-icon">
                <FaSyringe />
              </div>
              <div>
                <span>Vacinas</span>
                <p>Acompanhe os registros de vacinação.</p>
              </div>
              <FaArrowRight className="dashboard-card-arrow" />
            </article>

            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon family-icon">
                <FaUsers />
              </div>
              <div>
                <span>Família</span>
                <p>Compartilhe os cuidados com sua família.</p>
              </div>
              <button
                aria-label="Acessar família"
                onClick={onFamily}
              >
                <FaArrowRight />
              </button>
            </article>
          </div>
        </section>

        <section className="dashboard-section dashboard-bottom-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>Organize sua rotina</h2>
            </div>
          </div>

          <div className="dashboard-empty-state">
            <div className="dashboard-empty-icon">
              <FaCalendarAlt />
            </div>
            <h3>Seus cuidados começam aqui</h3>
            <p>
              Cadastre seus pets para começarmos a organizar
              as informações de cuidado.
            </p>
            <button
              className="dashboard-secondary-button"
              onClick={onPets}
            >
              Acessar meus pets
            </button>
          </div>
        </section>

        <footer className="dashboard-footer">
          Pet Mon Go · Cuidado Familiar Inteligente e Conectado
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
