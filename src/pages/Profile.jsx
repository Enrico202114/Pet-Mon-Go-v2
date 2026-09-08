import { useEffect, useState } from "react";

import {
    FaUser,
    FaPaw,
    FaUsers,
    FaPen,
    FaSave,
    FaTimes,
    FaCamera,
    FaTrash,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
    FaEnvelope,
    FaChevronRight,
    FaSignOutAlt
} from "react-icons/fa";

import logo from "../assets/logo.png";
import "./Profile.css";


function Profile({
    tutor,
    onBack,
    onOpenFamily,
    onAccountDeleted
}) {

    const [editando, setEditando] = useState(false);

    const [nome, setNome] = useState(tutor.nometutor);
    const [email, setEmail] = useState(tutor.emailtutor);

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    const [fotoPerfil, setFotoPerfil] = useState(null);

    const [alterandoSenha, setAlterandoSenha] = useState(false);

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [mensagemSenha, setMensagemSenha] = useState("");
    const [erroSenha, setErroSenha] = useState("");

    const [excluindoConta, setExcluindoConta] = useState(false);
    const [erroExclusao, setErroExclusao] = useState("");

    const [familia, setFamilia] = useState(null);


    // ==========================================
    // CARREGAR FAMÍLIA
    // ==========================================

    useEffect(() => {

        async function carregarFamilia() {

            try {

                const respostaTutor = await fetch(
                    `http://localhost:3000/tutores/${tutor.idtutor}`
                );

                if (!respostaTutor.ok) {
                    return;
                }

                const dadosTutor = await respostaTutor.json();

                if (!dadosTutor.idfamilia) {

                    setFamilia(null);

                    return;
                }

                const respostaFamilia = await fetch(
                    `http://localhost:3000/familias/${dadosTutor.idfamilia}`
                );

                if (!respostaFamilia.ok) {
                    return;
                }

                const dadosFamilia = await respostaFamilia.json();

                setFamilia(dadosFamilia);

            } catch (error) {

                console.error(
                    "Erro ao carregar família:",
                    error
                );

                setFamilia(null);
            }
        }

        carregarFamilia();

    }, [tutor.idtutor]);


    // ==========================================
    // FOTO DE PERFIL
    // ==========================================

    function selecionarFoto(e) {

        const arquivo = e.target.files[0];

        if (!arquivo) {
            return;
        }

        if (!arquivo.type.startsWith("image/")) {

            setErro(
                "Selecione um arquivo de imagem válido."
            );

            return;
        }

        if (arquivo.size > 5 * 1024 * 1024) {

            setErro(
                "A imagem deve ter no máximo 5 MB."
            );

            return;
        }

        const leitor = new FileReader();

        leitor.onload = () => {

            setFotoPerfil(leitor.result);

            setErro("");
        };

        leitor.readAsDataURL(arquivo);
    }


    function removerFoto() {

        setFotoPerfil(null);

        setErro("");
    }


    // ==========================================
    // EDITAR PERFIL
    // ==========================================

    function salvarAlteracoes(e) {

        e.preventDefault();

        setMensagem("");
        setErro("");

        if (!nome.trim()) {

            setErro(
                "Digite seu nome."
            );

            return;
        }

        if (!email.trim()) {

            setErro(
                "Digite seu e-mail."
            );

            return;
        }

        setMensagem(
            "Alterações salvas!"
        );

        setEditando(false);
    }


    function cancelarEdicao() {

        setNome(tutor.nometutor);
        setEmail(tutor.emailtutor);

        setMensagem("");
        setErro("");

        setEditando(false);
    }


    // ==========================================
    // ALTERAR SENHA
    // ==========================================

    function salvarNovaSenha(e) {

        e.preventDefault();

        setMensagemSenha("");
        setErroSenha("");

        if (!novaSenha || !confirmarSenha) {

            setErroSenha(
                "Preencha os dois campos de senha."
            );

            return;
        }

        if (novaSenha.length < 6) {

            setErroSenha(
                "A nova senha deve ter pelo menos 6 caracteres."
            );

            return;
        }

        if (novaSenha !== confirmarSenha) {

            setErroSenha(
                "As senhas não coincidem."
            );

            return;
        }

        setMensagemSenha(
            "Senha alterada com sucesso!"
        );

        setNovaSenha("");
        setConfirmarSenha("");

        setAlterandoSenha(false);
    }


    // ==========================================
    // EXCLUIR CONTA
    // ==========================================

    async function excluirConta() {

        setErroExclusao("");
        setExcluindoConta(true);

        try {

            const resposta = await fetch(
                `http://localhost:3000/tutores/${tutor.idtutor}`,
                {
                    method: "DELETE"
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {

                setErroExclusao(
                    dados.message ||
                    "Não foi possível excluir a conta."
                );

                setExcluindoConta(false);

                return;
            }

            // Remove o tutor salvo no navegador
            localStorage.removeItem(
                "petmon_tutor"
            );

            // Informa ao App que a conta foi excluída
            onAccountDeleted();

        } catch (error) {

            console.error(
                "Erro ao excluir conta:",
                error
            );

            setErroExclusao(
                "Não foi possível conectar ao servidor."
            );

            setExcluindoConta(false);
        }
    }


    // ==========================================
    // TELA
    // ==========================================

    return (

        <div className="profile-page">


            {/* ==========================================
                NAVBAR
            ========================================== */}

            <header className="app-navbar">

                <div className="app-logo">

                    <img
                        src={logo}
                        alt="Pet Mon Go"
                    />

                </div>


                <div className="app-user">

                    <div className="app-user-avatar">

                        <FaUser />

                    </div>

                    <span>
                        {nome}
                    </span>

                </div>

            </header>


            <div className="profile-layout">


                {/* ==========================================
                    SIDEBAR
                ========================================== */}

                <aside className="profile-sidebar">


                    <button
                        className="profile-sidebar-item active"
                    >

                        <FaUser />

                        <span>
                            Perfil
                        </span>

                    </button>


                    <button
                        className="profile-sidebar-item"
                    >

                        <FaPaw />

                        <span>
                            Meus Pets
                        </span>

                    </button>


                    <button
                        className="profile-sidebar-item"
                        onClick={onOpenFamily}
                    >

                        <FaUsers />

                        <span>
                            Família
                        </span>

                    </button>


                    <button
                        className="profile-sidebar-logout"
                        onClick={onBack}
                    >

                        <FaSignOutAlt />

                        <span>
                            Sair
                        </span>

                    </button>

                </aside>


                {/* ==========================================
                    CONTEÚDO
                ========================================== */}

                <main className="profile-content">


                    {/* TÍTULO */}

                    <div className="profile-page-title">

                        <h1>
                            Meu Perfil
                        </h1>

                        <p>
                            Gerencie suas informações pessoais e sua conta.
                        </p>

                    </div>


                    {/* MENSAGENS */}

                    {erro && (

                        <div className="profile-message error">

                            {erro}

                        </div>

                    )}


                    {mensagem && (

                        <div className="profile-message success">

                            {mensagem}

                        </div>

                    )}


                    {/* ==========================================
                        PERFIL PRINCIPAL
                    ========================================== */}

                    <section className="profile-hero-card">


                        <div className="profile-main">


                            {/* FOTO */}

                            <div className="profile-avatar">

                                {fotoPerfil ? (

                                    <img
                                        src={fotoPerfil}
                                        alt="Foto de perfil"
                                        className="profile-avatar-image"
                                    />

                                ) : (

                                    <div className="profile-avatar-icon">

                                        <FaUser />

                                    </div>

                                )}


                                {editando && (

                                    <>

                                        <label
                                            htmlFor="fotoPerfil"
                                            className="avatar-edit"
                                            title="Alterar foto"
                                        >

                                            <FaCamera />

                                        </label>


                                        <input
                                            id="fotoPerfil"
                                            type="file"
                                            accept="image/*"
                                            onChange={selecionarFoto}
                                            style={{
                                                display: "none"
                                            }}
                                        />

                                    </>

                                )}

                            </div>


                            {/* IDENTIDADE */}

                            <div className="profile-identity">

                                {!editando ? (

                                    <>

                                        <h2>
                                            {nome}
                                        </h2>

                                        <p>
                                            Tutor Pet Mon Go
                                        </p>

                                        <span>

                                            <FaEnvelope />

                                            {email}

                                        </span>

                                    </>

                                ) : (

                                    <div className="profile-edit-name">


                                        <label>
                                            Nome
                                        </label>

                                        <input
                                            type="text"
                                            value={nome}
                                            onChange={(e) =>
                                                setNome(e.target.value)
                                            }
                                        />


                                        <label>
                                            E-mail
                                        </label>

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />

                                    </div>

                                )}

                            </div>


                            {/* EDITAR */}

                            {!editando && (

                                <button
                                    className="profile-edit-btn"
                                    onClick={() => {

                                        setMensagem("");
                                        setErro("");
                                        setEditando(true);

                                    }}
                                >

                                    <FaPen />

                                    Editar

                                </button>

                            )}

                        </div>


                        {/* ==========================================
                            AÇÕES DA FOTO
                        ========================================== */}

                        {editando && (

                            <div className="profile-photo-actions">


                                <label
                                    htmlFor="fotoPerfil"
                                    className="photo-change-btn"
                                >

                                    <FaCamera />

                                    <span>
                                        Alterar foto
                                    </span>

                                </label>


                                {fotoPerfil && (

                                    <button
                                        type="button"
                                        className="photo-remove-btn"
                                        onClick={removerFoto}
                                    >

                                        <FaTrash />

                                        <span>
                                            Remover foto
                                        </span>

                                    </button>

                                )}

                            </div>

                        )}


                        {/* ==========================================
                            AÇÕES DE EDIÇÃO
                        ========================================== */}

                        {editando && (

                            <div className="profile-edit-actions">


                                <button
                                    type="button"
                                    className="profile-cancel-btn"
                                    onClick={cancelarEdicao}
                                >

                                    <FaTimes />

                                    Cancelar

                                </button>


                                <button
                                    type="button"
                                    className="profile-save-btn"
                                    onClick={salvarAlteracoes}
                                >

                                    <FaSave />

                                    Salvar alterações

                                </button>

                            </div>

                        )}

                    </section>


                    {/* ==========================================
                        INFORMAÇÕES DA CONTA
                    ========================================== */}

                    <section className="profile-section">


                        <div className="section-title">

                            <div className="section-title-icon">

                                <FaUser />

                            </div>


                            <div>

                                <h3>
                                    Informações da conta
                                </h3>

                                <p>
                                    Dados utilizados na sua conta Pet Mon Go.
                                </p>

                            </div>

                        </div>


                        <div className="profile-info-grid">


                            <div className="profile-info">

                                <span>
                                    Nome
                                </span>

                                <strong>
                                    {nome}
                                </strong>

                            </div>


                            <div className="profile-info">

                                <span>
                                    E-mail
                                </span>

                                <strong>
                                    {email}
                                </strong>

                            </div>

                        </div>

                    </section>


                    {/* ==========================================
                        SEGURANÇA
                    ========================================== */}

                    <section className="profile-section">


                        <div className="section-title">

                            <div className="section-title-icon">

                                <FaShieldAlt />

                            </div>


                            <div>

                                <h3>
                                    Segurança da conta
                                </h3>

                                <p>
                                    Gerencie a segurança da sua conta.
                                </p>

                            </div>

                        </div>


                        {!alterandoSenha ? (

                            <div className="security-card">


                                <div className="security-icon">

                                    <FaLock />

                                </div>


                                <div className="security-info">

                                    <strong>
                                        Senha
                                    </strong>

                                    <span>
                                        Proteja sua conta mantendo uma senha segura.
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    className="security-change-btn"
                                    onClick={() => {

                                        setErroSenha("");
                                        setMensagemSenha("");
                                        setAlterandoSenha(true);

                                    }}
                                >

                                    Alterar senha

                                </button>

                            </div>

                        ) : (

                            <form
                                className="password-form"
                                onSubmit={salvarNovaSenha}
                            >


                                <div className="password-field">

                                    <label>
                                        Nova senha
                                    </label>

                                    <div className="password-input">

                                        <input
                                            type={
                                                mostrarNovaSenha
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Digite sua nova senha"
                                            value={novaSenha}
                                            onChange={(e) =>
                                                setNovaSenha(e.target.value)
                                            }
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMostrarNovaSenha(
                                                    !mostrarNovaSenha
                                                )
                                            }
                                        >

                                            {mostrarNovaSenha ? (

                                                <FaEyeSlash />

                                            ) : (

                                                <FaEye />

                                            )}

                                        </button>

                                    </div>

                                </div>


                                <div className="password-field">

                                    <label>
                                        Confirmar nova senha
                                    </label>

                                    <div className="password-input">

                                        <input
                                            type={
                                                mostrarConfirmarSenha
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Digite a senha novamente"
                                            value={confirmarSenha}
                                            onChange={(e) =>
                                                setConfirmarSenha(
                                                    e.target.value
                                                )
                                            }
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMostrarConfirmarSenha(
                                                    !mostrarConfirmarSenha
                                                )
                                            }
                                        >

                                            {mostrarConfirmarSenha ? (

                                                <FaEyeSlash />

                                            ) : (

                                                <FaEye />

                                            )}

                                        </button>

                                    </div>

                                </div>


                                {erroSenha && (

                                    <div className="profile-message error">

                                        {erroSenha}

                                    </div>

                                )}


                                {mensagemSenha && (

                                    <div className="profile-message success">

                                        {mensagemSenha}

                                    </div>

                                )}


                                <div className="password-actions">


                                    <button
                                        type="button"
                                        className="profile-cancel-btn"
                                        onClick={() => {

                                            setNovaSenha("");
                                            setConfirmarSenha("");
                                            setErroSenha("");
                                            setAlterandoSenha(false);

                                        }}
                                    >

                                        <FaTimes />

                                        Cancelar

                                    </button>


                                    <button
                                        type="submit"
                                        className="profile-save-btn"
                                    >

                                        <FaSave />

                                        Alterar senha

                                    </button>

                                </div>

                            </form>

                        )}

                    </section>


                    {/* ==========================================
                        RESUMO PET MON GO
                    ========================================== */}

                    <section className="profile-section">


                        <div className="section-title">

                            <div className="section-title-icon">

                                <FaPaw />

                            </div>


                            <div>

                                <h3>
                                    Pet Mon Go
                                </h3>

                                <p>
                                    Resumo da sua conta no sistema.
                                </p>

                            </div>

                        </div>


                        <div className="profile-stats">


                            {/* PETS */}

                            <div className="profile-stat">

                                <div className="stat-icon">

                                    <FaPaw />

                                </div>


                                <div>

                                    <strong>
                                        0
                                    </strong>

                                    <span>
                                        Pets cadastrados
                                    </span>

                                </div>


                                <FaChevronRight
                                    className="stat-arrow"
                                />

                            </div>


                            {/* FAMÍLIA */}

                            <div className="profile-stat">

                                <div className="stat-icon">

                                    <FaUsers />

                                </div>


                                <div>

                                    <strong>
                                        {familia ? "1" : "0"}
                                    </strong>

                                    <span>

                                        {familia
                                            ? familia.nomefamilia
                                            : "Nenhuma família"}

                                    </span>

                                </div>


                                <FaChevronRight
                                    className="stat-arrow"
                                />

                            </div>

                        </div>

                    </section>


                    {/* ==========================================
                        EXCLUIR CONTA
                    ========================================== */}

                    <section className="profile-section delete-account-section">


                        <div className="section-title">

                            <div className="section-title-icon">

                                <FaTrash />

                            </div>


                            <div>

                                <h3>
                                    Excluir conta
                                </h3>

                                <p>
                                    Gerencie sua conta Pet Mon Go.
                                </p>

                            </div>

                        </div>


                        {!excluindoConta ? (

                            <div className="delete-account-card">


                                <div className="delete-account-info">

                                    <strong>
                                        Excluir minha conta
                                    </strong>

                                    <span>
                                        Esta ação removerá sua conta permanentemente.
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    className="delete-account-btn"
                                    onClick={() => {

                                        const confirmar =
                                            window.confirm(
                                                "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita."
                                            );

                                        if (confirmar) {

                                            excluirConta();

                                        }

                                    }}
                                >

                                    <FaTrash />

                                    Excluir conta

                                </button>

                            </div>

                        ) : (

                            <div className="delete-account-confirm">

                                <strong>
                                    Excluindo sua conta...
                                </strong>

                                <span>
                                    Aguarde enquanto removemos sua conta.
                                </span>

                            </div>

                        )}


                        {erroExclusao && (

                            <div className="profile-message error">

                                {erroExclusao}

                            </div>

                        )}

                    </section>


                    {/* ==========================================
                        RODAPÉ
                    ========================================== */}

                    <p className="profile-footer">

                        Pet Mon Go • Organizando o cuidado com quem faz parte da família

                    </p>

                </main>

            </div>

        </div>
    );
}


export default Profile;