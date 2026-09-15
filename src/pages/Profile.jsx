import React from "react";
import {
    FaUser,
    FaHome,
    FaPaw,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaEnvelope,
    FaLock,
    FaEdit,
    FaShieldAlt,
    FaClipboardList,
    FaLightbulb,
    FaHeart,
    FaClock,
    FaCalendarCheck,
    FaTrashAlt,
    FaSyringe,
    FaUtensils,
    FaWalking,
    FaPills
} from "react-icons/fa";

import logo from "../assets/logo.png";
import "./Profile.css";

function Profile({
    onHome,
    onMinhaFamilia,
    onCriarFamilia,
    onSairFamilia,
    onLogout,
    onAccountDeleted
}) {

    const handleHome = () => {
        if (onHome) {
            onHome();
        }
    };

    const handleMinhaFamilia = () => {
        if (onMinhaFamilia) {
            onMinhaFamilia();
        }
    };

    const handleCriarFamilia = () => {
        if (onCriarFamilia) {
            onCriarFamilia();
        }
    };

    const handleLogout = () => {
        console.log("Saindo da Conta");

        if (onLogout) {
            onLogout();
        }
    };

    const handleEditar = () => {
        alert("Área de edição do perfil.");
    };

    const handleAlterarSenha = () => {
        alert("Área para alteração de senha.");
    };

    const handleExcluirConta = () => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir sua conta? Esta ação é permanente."
        );

        if (confirmar) {
            alert("A exclusão da conta será realizada posteriormente.");
        }
    };

    return (
        <div className="profile-page">

            {/* =========================
                BARRA SUPERIOR
            ========================= */}
            <header className="app-navbar">

                <div className="app-logo">
                    <img src={logo} alt="Pet Mon Go" />
                </div>

                <div className="app-user">
                    <div className="app-user-avatar">
                        <FaUser />
                    </div>

                    <span>Enrico</span>
                </div>

            </header>


            {/* =========================
                LAYOUT PRINCIPAL
            ========================= */}
            <div className="profile-layout">

                {/* =========================
                    MENU LATERAL
                ========================= */}
                <aside className="profile-sidebar">

                    <button
                        className="profile-sidebar-item"
                        onClick={handleHome}
                    >
                        <FaHome />
                        <span>Início</span>
                    </button>

                    <button
                        className="profile-sidebar-item active"
                    >
                        <FaUser />
                        <span>Meu Perfil</span>
                    </button>

                    <button
                        className="profile-sidebar-item"
                        onClick={handleMinhaFamilia}
                    >
                        <FaUsers />
                        <span>Minha Família</span>
                    </button>

                    <button
                        className="profile-sidebar-item"
                        onClick={handleCriarFamilia}
                    >
                        <FaUsers />
                        <span>Criar Família</span>
                    </button>

                    <button className="profile-sidebar-item">
                        <FaPaw />
                        <span>Meus Pets</span>
                    </button>

                    <button className="profile-sidebar-item">
                        <FaCog />
                        <span>Configurações</span>
                    </button>


                    <button
                        className="profile-sidebar-logout"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt />
                        <span>Sair</span>
                    </button>

                </aside>


                {/* =========================
                    CONTEÚDO
                ========================= */}
                <main className="profile-content">

                    {/* TÍTULO */}
                    <div className="profile-page-title">
                        <h1>Meu Perfil</h1>

                        <p>
                            Gerencie suas informações e acompanhe sua
                            experiência no Pet Mon Go.
                        </p>
                    </div>


                    {/* =========================
                        PERFIL PRINCIPAL
                    ========================= */}
                    <section className="profile-hero-card">

                        <div className="profile-main">

                            <div className="profile-avatar">

                                <div className="profile-avatar-icon">
                                    <FaUser />
                                </div>

                                <button
                                    className="avatar-edit"
                                    title="Alterar foto"
                                >
                                    <FaEdit />
                                </button>

                            </div>


                            <div className="profile-identity">

                                <h2>Enrico</h2>

                                <p>Tutor Pet Mon Go</p>

                                <span>
                                    <FaEnvelope />
                                    &nbsp; enrico@email.com
                                </span>

                            </div>


                            <button
                                className="profile-edit-btn"
                                onClick={handleEditar}
                            >
                                <FaEdit />
                                &nbsp; Editar
                            </button>

                        </div>

                    </section>


                    {/* =========================
                        INFORMAÇÕES DA CONTA
                    ========================= */}
                    <section className="profile-section">

                        <div className="section-title">

                            <div className="section-title-icon">
                                <FaUser />
                            </div>

                            <div>
                                <h3>Informações da conta</h3>

                                <p>
                                    Dados utilizados no seu perfil.
                                </p>
                            </div>

                        </div>


                        <div className="profile-info-grid">

                            <div className="profile-info">
                                <span>Nome</span>
                                <strong>Enrico</strong>
                            </div>

                            <div className="profile-info">
                                <span>E-mail</span>
                                <strong>enrico@email.com</strong>
                            </div>

                            <div className="profile-info">
                                <span>Tipo de conta</span>
                                <strong>Tutor</strong>
                            </div>

                            <div className="profile-info">
                                <span>Status</span>
                                <strong className="status-active">
                                    Conta ativa
                                </strong>
                            </div>

                        </div>

                    </section>


                    {/* =========================
                        SEGURANÇA + ESTATÍSTICAS
                    ========================= */}
                    <div className="profile-columns">


                        {/* SEGURANÇA */}
                        <section className="profile-section">

                            <div className="section-title">

                                <div className="section-title-icon">
                                    <FaShieldAlt />
                                </div>

                                <div>
                                    <h3>Segurança da conta</h3>

                                    <p>
                                        Proteja seus dados.
                                    </p>
                                </div>

                            </div>


                            <div className="security-card">

                                <div className="security-icon">
                                    <FaLock />
                                </div>

                                <div className="security-info">

                                    <strong>Senha</strong>

                                    <span>
                                        Sua senha está protegida.
                                    </span>

                                </div>

                                <button
                                    className="security-change-btn"
                                    onClick={handleAlterarSenha}
                                >
                                    Alterar senha
                                </button>

                            </div>

                        </section>


                        {/* ESTATÍSTICAS */}
                        <section className="profile-section">

                            <div className="section-title">

                                <div className="section-title-icon">
                                    <FaPaw />
                                </div>

                                <div>
                                    <h3>Pet Mon Go</h3>

                                    <p>
                                        Resumo da sua conta.
                                    </p>
                                </div>

                            </div>


                            <div className="profile-stats">

                                <div className="profile-stat">

                                    <div className="stat-icon">
                                        <FaPaw />
                                    </div>

                                    <div>
                                        <strong>0</strong>
                                        <span>Pets cadastrados</span>
                                    </div>

                                </div>


                                <div className="profile-stat">

                                    <div className="stat-icon">
                                        <FaUsers />
                                    </div>

                                    <div>
                                        <strong>0</strong>
                                        <span>Famílias</span>
                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>


                    {/* =========================
                        ATIVIDADES
                    ========================= */}
                    <section className="profile-section">

                        <div className="section-title">

                            <div className="section-title-icon">
                                <FaClipboardList />
                            </div>

                            <div>
                                <h3>Atividades recentes</h3>

                                <p>
                                    Acompanhe as principais ações da sua conta.
                                </p>
                            </div>

                        </div>


                        <div className="activity-grid">

                            <div className="activity-item">

                                <div className="activity-icon">
                                    <FaClock />
                                </div>

                                <div>
                                    <strong>Último acesso</strong>

                                    <span>
                                        Acesso realizado recentemente.
                                    </span>
                                </div>

                            </div>


                            <div className="activity-item">

                                <div className="activity-icon">
                                    <FaCalendarCheck />
                                </div>

                                <div>
                                    <strong>Rotinas</strong>

                                    <span>
                                        Organize os cuidados do seu pet.
                                    </span>
                                </div>

                            </div>


                            <div className="activity-item">

                                <div className="activity-icon">
                                    <FaPaw />
                                </div>

                                <div>
                                    <strong>Pets cadastrados</strong>

                                    <span>
                                        Você ainda não possui pets cadastrados.
                                    </span>
                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =========================
                        DICAS PET MON GO
                    ========================= */}
                    <section className="profile-section tips-section">

                        <div className="section-title">

                            <div className="section-title-icon">
                                <FaLightbulb />
                            </div>

                            <div>
                                <h3>Dicas Pet Mon Go</h3>

                                <p>
                                    Pequenos cuidados fazem diferença.
                                </p>
                            </div>

                        </div>


                        <div className="tip-card">

                            <div className="tip-icon">
                                <FaHeart />
                            </div>

                            <div>
                                <strong>
                                    Mantenha os cuidados organizados
                                </strong>

                                <p>
                                    Registre vacinas, alimentação,
                                    passeios, medicações e consultas
                                    veterinárias para acompanhar a rotina
                                    do seu pet.
                                </p>
                            </div>

                        </div>

                    </section>


                    {/* =========================
                        CUIDADOS COM O PET
                    ========================= */}
                    <section className="profile-section">

                        <div className="section-title">

                            <div className="section-title-icon">
                                <FaPaw />
                            </div>

                            <div>
                                <h3>Cuidados com seu pet</h3>

                                <p>
                                    Tudo organizado em um só lugar.
                                </p>
                            </div>

                        </div>


                        <div className="care-grid">

                            <div className="care-card">

                                <div className="care-icon">
                                    <FaSyringe />
                                </div>

                                <div>
                                    <strong>Vacinas</strong>

                                    <span>
                                        Acompanhe o histórico de vacinação.
                                    </span>
                                </div>

                            </div>


                            <div className="care-card">

                                <div className="care-icon">
                                    <FaUtensils />
                                </div>

                                <div>
                                    <strong>Alimentação</strong>

                                    <span>
                                        Organize os horários das refeições.
                                    </span>
                                </div>

                            </div>


                            <div className="care-card">

                                <div className="care-icon">
                                    <FaWalking />
                                </div>

                                <div>
                                    <strong>Passeios</strong>

                                    <span>
                                        Controle a rotina de passeios.
                                    </span>

                                </div>

                            </div>


                            <div className="care-card">

                                <div className="care-icon">
                                    <FaPills />
                                </div>

                                <div>
                                    <strong>Medicação</strong>

                                    <span>
                                        Não perca os horários dos medicamentos.
                                    </span>
                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =========================
                        FAMÍLIA
                    ========================= */}
                    <section className="profile-section family-info-section">

                        <div className="section-title">

                            <div className="section-title-icon">
                                <FaUsers />
                            </div>

                            <div>
                                <h3>Família Pet Mon Go</h3>

                                <p>
                                    Compartilhe os cuidados com sua família.
                                </p>
                            </div>

                        </div>


                        <div className="family-info-content">

                            <div className="family-main-icon">
                                <FaUsers />
                            </div>

                            <div className="family-main-text">

                                <strong>
                                    Organize os cuidados em família
                                </strong>

                                <p>
                                    Crie uma família no Pet Mon Go para
                                    compartilhar tarefas e manter todos
                                    informados sobre os cuidados dos pets.
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* =========================
                        EXCLUIR CONTA
                    ========================= */}
                    <section className="profile-section profile-delete-section">

                        <div className="section-title">

                            <div className="section-title-icon">
                                <FaTrashAlt />
                            </div>

                            <div>
                                <h3>Excluir conta</h3>

                                <p>
                                    Gerencie sua conta Pet Mon Go.
                                </p>
                            </div>

                        </div>


                        <div className="delete-account-content">

                            <div>

                                <strong>
                                    Excluir minha conta
                                </strong>

                                <span>
                                    Esta ação removerá sua conta permanentemente.
                                </span>

                            </div>


                            <button
                                className="delete-account-btn"
                                onClick={handleExcluirConta}
                            >
                                <FaTrashAlt />
                                &nbsp; Excluir conta
                            </button>

                        </div>

                    </section>


                    {/* =========================
                        RODAPÉ
                    ========================= */}
                    <footer className="profile-footer">

                        Pet Mon Go • Organizando o cuidado com quem faz parte da família

                    </footer>

                </main>

            </div>

        </div>
    );
}

export default Profile;