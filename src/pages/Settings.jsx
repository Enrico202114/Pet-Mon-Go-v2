
import { useEffect, useState } from "react";
import {
    FaUser,
    FaBell,
    FaMoon,
    FaSun,
    FaShieldAlt,
    FaSignOutAlt
} from "react-icons/fa";

import DashboardSidebar from "../components/DashboardSidebar";
import "./Settings.css";
import "./Dashboard.css";

function Settings({
    tutor,
    onHome,
    onOpenProfile,
    onPets,
    onFamily,
    onSettings,
    onLogout
}) {
    const [temaEscuro, setTemaEscuro] = useState(
        () => localStorage.getItem("petmon_tema") === "escuro"
    );

    const [notificacoes, setNotificacoes] = useState(
        () => localStorage.getItem("petmon_notificacoes") !== "desativadas"
    );

    useEffect(() => {
        localStorage.setItem(
            "petmon_tema",
            temaEscuro ? "escuro" : "claro"
        );
    }, [temaEscuro]);

    useEffect(() => {
        localStorage.setItem(
            "petmon_notificacoes",
            notificacoes ? "ativadas" : "desativadas"
        );
    }, [notificacoes]);

    const nomeTutor =
        tutor?.nometutor ||
        tutor?.nome ||
        tutor?.name ||
        "Tutor Pet Mon Go";

    const emailTutor =
        tutor?.emailtutor ||
        tutor?.email ||
        "E-mail não informado";

    return (
        <div className="dashboard">
            <DashboardSidebar
                paginaAtiva="configuracoes"
                onHome={onHome}
                onOpenProfile={onOpenProfile}
                onPets={onPets}
                onFamily={onFamily}
                onSettings={onSettings}
                onLogout={onLogout}
            />

            <main className={`dashboard-main settings-page ${temaEscuro ? "settings-dark" : ""}`}>
                <section className="settings-container">

                    <header className="settings-header">
                        <div>
                            <span className="settings-eyebrow">
                                PET MON GO
                            </span>
                            <h1>Configurações</h1>
                            <p>
                                Personalize sua experiência e gerencie suas preferências.
                            </p>
                        </div>
                    </header>

                    <section className="settings-card">
                        <div className="settings-card-icon">
                            <FaUser />
                        </div>

                        <div className="settings-card-content">
                            <h2>Minha conta</h2>
                            <p>Confira os dados da sua conta.</p>

                            <div className="settings-account-info">
                                <div>
                                    <span>Nome</span>
                                    <strong>{nomeTutor}</strong>
                                </div>

                                <div>
                                    <span>E-mail</span>
                                    <strong>{emailTutor}</strong>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="settings-card">
                        <div className="settings-card-icon">
                            {temaEscuro ? <FaMoon /> : <FaSun />}
                        </div>

                        <div className="settings-card-content">
                            <h2>Aparência</h2>
                            <p>Escolha a aparência desta tela.</p>

                            <div className="settings-option">
                                <div>
                                    <strong>
                                        {temaEscuro ? "Tema escuro" : "Tema claro"}
                                    </strong>
                                    <span>
                                        {temaEscuro
                                            ? "A tela está usando cores escuras."
                                            : "A tela está usando cores claras."}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className={`settings-toggle ${temaEscuro ? "active" : ""}`}
                                    role="switch"
                                    aria-checked={temaEscuro}
                                    aria-label="Alternar tema escuro"
                                    onClick={() => setTemaEscuro(valor => !valor)}
                                >
                                    <span />
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="settings-card">
                        <div className="settings-card-icon">
                            <FaBell />
                        </div>

                        <div className="settings-card-content">
                            <h2>Notificações</h2>
                            <p>Defina sua preferência para receber avisos.</p>

                            <div className="settings-option">
                                <div>
                                    <strong>
                                        {notificacoes
                                            ? "Notificações ativadas"
                                            : "Notificações desativadas"}
                                    </strong>
                                    <span>
                                        Esta opção salva sua preferência neste dispositivo.
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className={`settings-toggle ${notificacoes ? "active" : ""}`}
                                    role="switch"
                                    aria-checked={notificacoes}
                                    aria-label="Alternar notificações"
                                    onClick={() => setNotificacoes(valor => !valor)}
                                >
                                    <span />
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="settings-card">
                        <div className="settings-card-icon">
                            <FaShieldAlt />
                        </div>

                        <div className="settings-card-content">
                            <h2>Privacidade e segurança</h2>
                            <p>
                                Mantenha seus dados de acesso protegidos e não compartilhe sua senha.
                            </p>
                            <span className="settings-info-label">
                                As opções avançadas serão adicionadas posteriormente.
                            </span>
                        </div>
                    </section>

                    <section className="settings-logout-card">
                        <div>
                            <h2>Sair da conta</h2>
                            <p>Encerre sua sessão neste dispositivo.</p>
                        </div>

                        <button
                            type="button"
                            className="settings-logout-button"
                            onClick={onLogout}
                        >
                            <FaSignOutAlt />
                            Sair
                        </button>
                    </section>

                </section>
            </main>
        </div>
    );
}

export default Settings;
