import { useEffect, useState } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import FooterPanel from "../components/FooterPanel";
import "./Settings.css";
import "./Dashboard.css";

function Settings({ tutor, temaEscuro, onToggleTema, onHome, onDashboard, onOpenProfile, onPets, onFamily, onSettings, onLogout }) {
  const [notificacoes, setNotificacoes] = useState(() => localStorage.getItem("petmon_notificacoes") !== "desativadas");
  useEffect(() => { localStorage.setItem("petmon_notificacoes", notificacoes ? "ativadas" : "desativadas"); }, [notificacoes]);
  return (
    <div className="dashboard">
      <Sidebar paginaAtiva="configuracao" onHome={onHome} onDashboard={onDashboard} onOpenProfile={onOpenProfile} onPets={onPets} onFamily={onFamily} onSettings={onSettings} onLogout={onLogout} />
      <main className="dashboard-main settings-page">
        <section className="settings-container">
          <header className="settings-header"><h1>Configurações</h1></header>
          <section className="settings-card">
            <div className="settings-card-icon">{temaEscuro ? <FaMoon /> : <FaSun />}</div>
            <div className="settings-card-content"><h2>Aparência</h2><div className="settings-option"><strong>{temaEscuro ? "Tema escuro" : "Tema claro"}</strong>
              <button type="button" className={`settings-toggle ${temaEscuro ? "active" : ""}`} role="switch" aria-checked={temaEscuro} aria-label="Alternar tema escuro" onClick={onToggleTema}><span /></button>
            </div></div>
          </section>
          <section className="settings-card">
            <div className="settings-card-icon"><FaBell /></div>
            <div className="settings-card-content"><h2>Notificações</h2><div className="settings-option"><strong>{notificacoes ? "Notificações ativadas" : "Notificações desativadas"}</strong>
              <button type="button" className={`settings-toggle ${notificacoes ? "active" : ""}`} role="switch" aria-checked={notificacoes} aria-label="Alternar notificações" onClick={() => setNotificacoes((value) => !value)}><span /></button>
            </div></div>
          </section>
        </section>
        <FooterPanel />
      </main>
    </div>
  );
}
export default Settings;
