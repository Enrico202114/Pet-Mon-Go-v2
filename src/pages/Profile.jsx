import { useState } from "react";

import {
    FaArrowLeft,
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
    FaShieldAlt
} from "react-icons/fa";

import "./Profile.css";

function Profile({ tutor, onBack }) {

    // ==========================================
    // ESTADOS DO PERFIL
    // ==========================================

    const [editando, setEditando] = useState(false);

    const [nome, setNome] = useState(tutor.nometutor);
    const [email, setEmail] = useState(tutor.emailtutor);

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");


    // ==========================================
    // ESTADO DA FOTO
    // ==========================================

    const [fotoPerfil, setFotoPerfil] = useState(null);


    // ==========================================
    // ESTADOS DA SENHA
    // ==========================================

    const [alterandoSenha, setAlterandoSenha] = useState(false);

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const [mensagemSenha, setMensagemSenha] = useState("");
    const [erroSenha, setErroSenha] = useState("");


    // ==========================================
    // SELECIONAR FOTO
    // ==========================================

    function selecionarFoto(e) {

        const arquivo = e.target.files[0];

        if (!arquivo) {
            return;
        }

        // Verifica se é uma imagem
        if (!arquivo.type.startsWith("image/")) {
            setErro("Selecione um arquivo de imagem válido.");
            return;
        }

        // Limite de 5 MB
        if (arquivo.size > 5 * 1024 * 1024) {
            setErro("A imagem deve ter no máximo 5 MB.");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = () => {
            setFotoPerfil(leitor.result);

            setErro("");
            setMensagem("Foto de perfil atualizada! 🎉");
        };

        leitor.readAsDataURL(arquivo);
    }


    // ==========================================
    // REMOVER FOTO
    // ==========================================

    function removerFoto() {

        setFotoPerfil(null);

        setMensagem("Foto de perfil removida.");
        setErro("");
    }


    // ==========================================
    // SALVAR DADOS DO PERFIL
    // ==========================================

    function salvarAlteracoes(e) {

        e.preventDefault();

        setMensagem("");
        setErro("");

        if (!nome.trim()) {
            setErro("Digite seu nome.");
            return;
        }

        if (!email.trim()) {
            setErro("Digite seu e-mail.");
            return;
        }

        // Por enquanto o salvamento é visual.
        // Depois vamos conectar ao PUT do backend.

        setMensagem("Alterações salvas! 🎉");

        setEditando(false);
    }


    // ==========================================
    // CANCELAR EDIÇÃO
    // ==========================================

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
            setErroSenha("Preencha os dois campos de senha.");
            return;
        }

        if (novaSenha.length < 6) {
            setErroSenha(
                "A nova senha deve ter pelo menos 6 caracteres."
            );
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErroSenha("As senhas não coincidem.");
            return;
        }

        // Por enquanto é apenas visual.
        // Depois vamos conectar ao backend.

        setMensagemSenha(
            "Senha alterada com sucesso! 🎉"
        );

        setNovaSenha("");
        setConfirmarSenha("");

        setAlterandoSenha(false);
    }


    // ==========================================
    // RENDERIZAÇÃO
    // ==========================================

    return (
        <div className="profile-page">

            <div className="profile-container">

                {/* ==========================================
                    TOPO
                ========================================== */}

                <div className="profile-top">

                    <button
                        className="profile-back"
                        onClick={onBack}
                    >
                        <FaArrowLeft />
                        Voltar
                    </button>

                    <h1>Meu Perfil</h1>

                </div>


                {/* ==========================================
                    CARTÃO PRINCIPAL
                ========================================== */}

                <div className="profile-card">

                    <div className="profile-main">

                        {/* ==========================================
                            FOTO DE PERFIL
                        ========================================== */}

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
                                        style={{ display: "none" }}
                                    />
                                </>
                            )}

                        </div>


                        {/* ==========================================
                            IDENTIDADE
                        ========================================== */}

                        <div className="profile-identity">

                            {!editando ? (
                                <>
                                    <h2>{nome}</h2>

                                    <p>
                                        Tutor Pet Mon Go
                                    </p>

                                    <span>
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


                        {/* ==========================================
                            BOTÃO EDITAR
                        ========================================== */}

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
                                Editar Perfil
                            </button>
                        )}

                    </div>


                    {/* ==========================================
                        CONTROLES DA FOTO
                    ========================================== */}

                    {editando && (
                        <div className="profile-photo-actions">

                            <label
                                htmlFor="fotoPerfil"
                                className="photo-change-btn"
                            >
                                <FaCamera />
                                <span>Alterar foto</span>
                            </label>

                            {fotoPerfil && (
                                <button
                                    type="button"
                                    className="photo-remove-btn"
                                    onClick={removerFoto}
                                >
                                    <FaTrash />
                                    <span>Remover foto</span>
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

                </div>


                {/* ==========================================
                    MENSAGENS DO PERFIL
                ========================================== */}

                {erro && (
                    <div className="profile-error">
                        {erro}
                    </div>
                )}

                {mensagem && (
                    <div className="profile-success">
                        {mensagem}
                    </div>
                )}


                {/* ==========================================
                    INFORMAÇÕES DA CONTA
                ========================================== */}

                <div className="profile-section">

                    <div className="section-title">

                        <FaUser />

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

                </div>


                {/* ==========================================
                    SEGURANÇA
                ========================================== */}

                <div className="profile-section">

                    <div className="section-title">

                        <FaShieldAlt />

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
                                            setConfirmarSenha(e.target.value)
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
                                <div className="profile-error">
                                    {erroSenha}
                                </div>
                            )}

                            {mensagemSenha && (
                                <div className="profile-success">
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

                </div>


                {/* ==========================================
                    PET MON GO
                ========================================== */}

                <div className="profile-section">

                    <div className="section-title">

                        <FaPaw />

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

                        </div>


                        <div className="profile-stat">

                            <div className="stat-icon">
                                <FaUsers />
                            </div>

                            <div>
                                <strong>
                                    Nenhuma
                                </strong>

                                <span>
                                    Família
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    RODAPÉ
                ========================================== */}

                <p className="profile-footer">
                    Pet Mon Go • Organizando o cuidado com quem faz parte da família 🐾
                </p>

            </div>

        </div>
    );
}

export default Profile;