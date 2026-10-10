import {
    FaUsers,
    FaUser,
    FaPaw,
    FaPlus,
    FaSignOutAlt,
    FaCopy
} from "react-icons/fa";

import DashboardSidebar from "../components/DashboardSidebar";
import "./Family.css";
import "./Dashboard.css";

function Family({
    modoFamilia,
    onCreateFamily,
    onLeaveFamily,
    onHome,
    onOpenProfile,
    onPets,
    onFamily,
    onSettings,
    onLogout
}) {
    const familiaExiste = modoFamilia !== "criar";

    function copiarCodigo() {
        navigator.clipboard.writeText("YRF3K6")
            .then(() => alert("Código da família copiado!"))
            .catch(() => alert("Não foi possível copiar o código."));
    }

    return (
        <div className="dashboard">

            <DashboardSidebar
                paginaAtiva="familia"
                onHome={onHome}
                onOpenProfile={onOpenProfile}
                onPets={onPets}
                onFamily={onFamily}
                onSettings={onSettings}
                onLogout={onLogout}
            />

            <main className="dashboard-main family-page">

                <section className="family-container">

                    <div className="family-header">

                        <div className="family-title-icon">
                            <FaUsers />
                        </div>

                        <div>
                            <h1>Minha Família</h1>
                            <p>
                                Organize os cuidados dos seus pets junto com sua família.
                            </p>
                        </div>

                    </div>

                    {familiaExiste ? (

                        <div className="family-content">

                            <div className="family-main-card">

                                <div className="family-card-top">
                                    <div className="family-avatar">
                                        <FaUsers />
                                    </div>

                                    <div>
                                        <span className="family-label">
                                            Família
                                        </span>

                                        <h2>Família Pet Mon Go</h2>

                                        <p>
                                            Cuidando juntos de quem faz parte da família.
                                        </p>
                                    </div>
                                </div>

                                <div className="family-code">

                                    <div>
                                        <span>Código da família</span>
                                        <strong>YRF3K6</strong>
                                    </div>

                                    <button
                                        type="button"
                                        className="copy-code"
                                        title="Copiar código"
                                        onClick={copiarCodigo}
                                    >
                                        <FaCopy />
                                    </button>

                                </div>

                            </div>

                            <div className="family-members-card">

                                <div className="card-heading">
                                    <div>
                                        <h3>Membros da família</h3>
                                        <p>Pessoas que participam dos cuidados.</p>
                                    </div>

                                    <span className="member-count">
                                        2
                                    </span>
                                </div>

                                <div className="member-list">

                                    <div className="member">
                                        <div className="member-avatar">
                                            <FaUser />
                                        </div>

                                        <div className="member-info">
                                            <strong>Você</strong>
                                            <span>Responsável</span>
                                        </div>
                                    </div>

                                    <div className="member">
                                        <div className="member-avatar">
                                            <FaUser />
                                        </div>

                                        <div className="member-info">
                                            <strong>Membro da família</strong>
                                            <span>Participante</span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="family-pets-card">

                                <div className="card-heading">
                                    <div>
                                        <h3>Pets da família</h3>
                                        <p>Veja os pets que fazem parte da família.</p>
                                    </div>

                                    <FaPaw className="pets-heading-icon" />
                                </div>

                                <div className="family-pet-preview">
                                    <div className="family-pet-avatar">
                                        <FaPaw />
                                    </div>

                                    <div>
                                        <strong>Meus Pets</strong>
                                        <span>
                                            Gerencie os pets da família.
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <button
                                className="leave-family-button"
                                onClick={onLeaveFamily}
                            >
                                <FaSignOutAlt />
                                Sair da família
                            </button>

                        </div>

                    ) : (

                        <div className="create-family-card">

                            <div className="create-family-icon">
                                <FaUsers />
                            </div>

                            <h2>Crie sua família</h2>

                            <p>
                                Crie uma família para compartilhar os cuidados
                                dos seus pets com outras pessoas.
                            </p>

                            <button
                                className="create-family-button"
                                onClick={onCreateFamily}
                            >
                                <FaPlus />
                                Criar família
                            </button>

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Family;