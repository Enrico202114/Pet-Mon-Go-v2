import React from "react";
import {
    FaUser,
    FaHome,
    FaPaw,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaEnvelope,
    FaEdit,
    FaShieldAlt,
    FaHeart,
    FaTrashAlt,
    FaChevronRight,
    FaInfoCircle,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import "./Profile.css";

function Profile({
    tutor,
    pets = [],
    onHome,
    onMinhaFamilia,
    onCriarFamilia,
    onSairFamilia,
    onOpenPets,
    onOpenSettings,
    onLogout,
    onAccountDeleted,
}) {
    const nomeTutor =
        tutor?.nometutor ||
        tutor?.nome ||
        tutor?.nomeTutor ||
        "Tutor";

    const emailTutor =
        tutor?.emailtutor ||
        tutor?.email ||
        tutor?.emailTutor ||
        "E-mail não informado";

    const quantidadePets = pets.length;

    const handleEditar = () => {
        alert("A edição do perfil será implementada na próxima etapa.");
    };

    const handleExcluirConta = () => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir sua conta? Esta ação é permanente."
        );

        if (confirmar) {
            if (onAccountDeleted) {
                onAccountDeleted();
            } else {
                alert(
                    "A exclusão da conta precisa ser conectada ao backend."
                );
            }
        }
    };

    const handleMinhaFamilia = () => {
        if (onMinhaFamilia) onMinhaFamilia();
    };

    const handleCriarFamilia = () => {
        if (onCriarFamilia) {
            onCriarFamilia();
        } else if (onMinhaFamilia) {
            onMinhaFamilia();
        }
    };

    const cards = [
        {
            titulo: "Dados do Perfil",
            descricao: "Visualize e edite suas informações pessoais.",
            icone: <FaUser />,
            classe: "green",
            acao: handleEditar,
        },
        {
            titulo: "Info da Conta",
            descricao: "Veja seus dados, e-mail e informações da conta.",
            icone: <FaInfoCircle />,
            classe: "gold",
            acao: handleEditar,
        },
        {
            titulo: "Segurança",
            descricao: "Cuide da proteção e da segurança da sua conta.",
            icone: <FaShieldAlt />,
            classe: "blue",
            acao: () =>
                alert("A alteração de senha será implementada na próxima etapa."),
        },
        {
            titulo: "Pet Mon Go",
            descricao: `${quantidadePets} pet(s) cadastrado(s). Acesse seus animais.`,
            icone: <FaPaw />,
            classe: "green-dark",
            acao: () => {
                if (onOpenPets) onOpenPets();
            },
        },
        {
            titulo: "Família",
            descricao: "Compartilhe os cuidados dos seus pets.",
            icone: <FaUsers />,
            classe: "gold",
            acao: handleMinhaFamilia,
        },
        {
            titulo: "Excluir Conta",
            descricao: "Remova sua conta permanentemente.",
            icone: <FaTrashAlt />,
            classe: "danger",
            acao: handleExcluirConta,
        },
    ];

    return (
        <div className="profile-page">
            <header className="profile-topbar">
                <button
                    className="profile-mobile-menu"
                    onClick={onHome}
                    aria-label="Ir para o início"
                >
                    <FaHome />
                </button>

                <div className="profile-topbar-user">
                    <div className="topbar-avatar">
                        <FaUser />
                    </div>
                    <span>{nomeTutor}</span>
                </div>
            </header>

            <aside className="profile-sidebar">
                <div className="profile-logo">
                    <img src={logo} alt="Pet Mon Go" />
                </div>

                <nav className="profile-navigation">
                    <button
                        className="profile-nav-item"
                        onClick={onHome}
                    >
                        <FaHome />
                        <span>Início</span>
                    </button>

                    <button
                        className="profile-nav-item active"
                        aria-current="page"
                    >
                        <FaUser />
                        <span>Meu Perfil</span>
                    </button>

                    <button
                        className="profile-nav-item"
                        onClick={handleMinhaFamilia}
                    >
                        <FaUsers />
                        <span>Família</span>
                    </button>

                    <button
                        className="profile-nav-item"
                        onClick={() => {
                            if (onOpenPets) onOpenPets();
                        }}
                    >
                        <FaPaw />
                        <span>Pets</span>
                    </button>

                    <button
                        className="profile-nav-item"
                        onClick={() => {
                            if (onOpenSettings) onOpenSettings();
                        }}
                    >
                        <FaCog />
                        <span>Configurações</span>
                    </button>

                    <button
                        className="profile-nav-item profile-nav-logout"
                        onClick={() => {
                            if (onLogout) onLogout();
                        }}
                    >
                        <FaSignOutAlt />
                        <span>Sair</span>
                    </button>
                </nav>

                <div className="profile-sidebar-decoration">
                    <FaPaw />
                    <FaHeart />
                </div>
            </aside>

            <main className="profile-content">
                <div className="profile-heading">
                    <div className="profile-heading-icon">
                        <FaCog />
                    </div>
                    <div>
                        <h1>Perfil</h1>
                        <p>
                            Gerencie suas informações e configurações da sua conta.
                        </p>
                    </div>
                </div>

                <section className="profile-hero-card">
                    <div className="profile-hero-top">
                        <div className="profile-avatar">
                            <div className="profile-avatar-icon">
                                <FaUser />
                            </div>

                            <button
                                className="avatar-edit"
                                title="Alterar foto"
                                aria-label="Alterar foto do perfil"
                                onClick={() =>
                                    alert(
                                        "A alteração da foto será implementada posteriormente."
                                    )
                                }
                            >
                                <FaEdit />
                            </button>
                        </div>

                        <div className="profile-identity">
                            <h2>{nomeTutor}</h2>
                            <p>
                                <FaEnvelope />
                                <span>{emailTutor}</span>
                            </p>
                            <span className="profile-status">
                                <span className="status-dot" />
                                Conta ativa
                            </span>
                        </div>

                        <FaPaw className="profile-hero-paw" />
                    </div>

                    <div className="profile-hero-details">
                        <div className="hero-detail">
                            <FaUser />
                            <div>
                                <span>Nome completo</span>
                                <strong>{nomeTutor}</strong>
                            </div>
                        </div>

                        <div className="hero-detail">
                            <FaEnvelope />
                            <div>
                                <span>E-mail</span>
                                <strong>{emailTutor}</strong>
                            </div>
                        </div>

                        <div className="hero-detail">
                            <FaPaw />
                            <div>
                                <span>Pets cadastrados</span>
                                <strong>{quantidadePets}</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="profile-cards-grid">
                    {cards.map((card) => (
                        <button
                            type="button"
                            className={`profile-option-card ${card.classe}`}
                            key={card.titulo}
                            onClick={card.acao}
                        >
                            <div className="option-card-decoration">
                                <FaPaw />
                            </div>

                            <div className="option-card-icon">
                                {card.icone}
                            </div>

                            <h2>{card.titulo}</h2>
                            <p>{card.descricao}</p>

                            <span className="option-card-arrow">
                                <FaChevronRight />
                            </span>
                        </button>
                    ))}
                </section>

                <section className="profile-family-banner">
                    <div className="family-banner-icon">
                        <FaUsers />
                    </div>

                    <div className="family-banner-text">
                        <h2>Cuidados compartilhados são melhores!</h2>
                        <p>
                            Crie ou acesse sua família para organizar os cuidados
                            dos seus pets com outras pessoas.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="family-banner-button"
                        onClick={handleCriarFamilia}
                    >
                        Minha família
                        <FaChevronRight />
                    </button>
                </section>

                <footer className="profile-footer">
                    <FaPaw />
                    <span>
                        Pet Mon Go · Cuidado familiar inteligente e conectado.
                    </span>
                    <FaHeart />
                </footer>
            </main>
        </div>
    );
}

export default Profile;
