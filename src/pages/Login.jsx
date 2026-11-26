import { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png";
import { FaEnvelope, FaLock, FaUser, FaHeart } from "react-icons/fa";

function Login({ modoInicial = "login", onLogin, onHome }) {
    const [isRegister, setIsRegister] = useState(modoInicial === "register");

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState(() => localStorage.getItem("petmon_email_salvo") || "");
    const [lembrarEmail, setLembrarEmail] = useState(() => Boolean(localStorage.getItem("petmon_email_salvo")));
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function cadastrar(e) {
        e.preventDefault();

        setMensagem("");
        setErro("");

        if (!nome || !email || !senha || !confirmarSenha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3000/tutores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nometutor: nome,
                    emailtutor: email,
                    senhatutor: senha
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.message || "Erro ao criar conta.");
                return;
            }

            setMensagem("Conta criada com sucesso!");

            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");

        } catch (erro) {
            console.error(erro);
            setErro("Não foi possível conectar ao servidor.");
        }
    }

    async function entrar(e) {
        e.preventDefault();

        setMensagem("");
        setErro("");

        if (!email || !senha) {
            setErro("Digite seu e-mail e sua senha.");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3000/tutores/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailtutor: email,
                    senhatutor: senha
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.message || "E-mail ou senha incorretos.");
                return;
            }

            if (lembrarEmail) {
                localStorage.setItem("petmon_email_salvo", email);
            } else {
                localStorage.removeItem("petmon_email_salvo");
            }

            setMensagem("Login realizado com sucesso!");

            console.log("Tutor logado:", dados.tutor);

            if (onLogin) {
                onLogin(dados.tutor);
}

        } catch (erro) {
            console.error(erro);
            setErro("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <main className={`auth-page ${isRegister ? "register-mode" : ""}`}>

            <div className="auth-card">

                <section className="auth-welcome">

                    <div className="welcome-content">

                        <img
                            src={logo}
                            alt="Logo"
                            className="auth-logo"
                        />

                        {!isRegister ? (
                            <>
                                <h1>Bem-vindo de volta!</h1>

                                <p>
                                    Entre na sua conta e continue
                                    organizando os cuidados do seu pet.
                                </p>

                                <button
                                    type="button"
                                    className="outline-button"
                                    onClick={() => {
                                        setIsRegister(true);
                                        setMensagem("");
                                        setErro("");
                                    }}
                                >
                                    Criar uma conta
                                </button>
                            </>
                        ) : (
                            <>
                                <h1>Já possui uma conta?</h1>

                                <p>
                                    Entre novamente no Pet Mon Go
                                    e continue cuidando do seu melhor amigo.
                                </p>

                                <button
                                    type="button"
                                    className="outline-button"
                                    onClick={() => {
                                        setIsRegister(false);
                                        setMensagem("");
                                        setErro("");
                                    }}
                                >
                                    Fazer Login
                                </button>
                            </>
                        )}

                        <button type="button" className="auth-home-link" onClick={onHome}>
                            Voltar para a página inicial
                        </button>

                    </div>

                </section>

                <section className="auth-form">

                    {!isRegister ? (

                        <>

                            <div className="form-header">

                                <div className="form-icon">
                                    <FaHeart />
                                </div>

                                <h2>Entrar</h2>

                                <p>
                                    Acessar sua conta Pet Mon Go
                                </p>

                            </div>


                            <form onSubmit={entrar}>

                                <div className="input-group">

                                    <div className="input-wrapper">

                                        <FaEnvelope />

                                        <input
                                            id="email"
                                            type="email"
                                            aria-label="E-mail"
                                            autoComplete="email"
                                            required
                                            placeholder="Digite seu e-mail"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="input-group">

                                    <div className="input-wrapper">

                                        <FaLock />

                                        <input
                                            type="password"
                                            aria-label="Senha"
                                            autoComplete="current-password"
                                            required
                                            placeholder="Digite sua senha"
                                            value={senha}
                                            onChange={(e) =>
                                                setSenha(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="form-options">

                                    <label className="remember">

                                        <input
                                            type="checkbox"
                                            checked={lembrarEmail}
                                            onChange={(event) => setLembrarEmail(event.target.checked)}
                                        />

                                        <span>
                                            Lembrar de mim
                                        </span>

                                    </label>


                                    <button
                                        type="button"
                                        className="forgot-password"
                                        onClick={() => setMensagem("A recuperação de senha ainda não está disponível. Nenhuma alteração foi feita na sua conta.")}
                                    >
                                        Esqueceu a senha?
                                    </button>

                                </div>


                                {erro && (
                                    <p className="error-message">
                                        {erro}
                                    </p>
                                )}

                                {mensagem && (
                                    <p className="success-message">
                                        {mensagem}
                                    </p>
                                )}


                                <button
                                    type="submit"
                                    className="main-button"
                                >
                                    Entrar
                                </button>

                            </form>

                        </>

                    ) : (


                        <>

                            <div className="form-header">

                                <div className="form-icon">
                                    <FaHeart />
                                </div>

                                <h2>Criar Conta</h2>

                                <p>
                                    Comece a cuidar melhor do seu pet
                                </p>

                            </div>


                            <form onSubmit={cadastrar}>

                                <div className="input-group">

                                    <div className="input-wrapper">

                                        <FaUser />

                                        <input
                                            id="name"
                                            type="text"
                                            aria-label="Nome"
                                            autoComplete="name"
                                            required
                                            placeholder="Digite seu nome"
                                            value={nome}
                                            onChange={(e) =>
                                                setNome(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="input-group">

                                    <div className="input-wrapper">

                                        <FaEnvelope />

                                        <input
                                            type="email"
                                            aria-label="E-mail"
                                            autoComplete="email"
                                            required
                                            placeholder="Digite seu email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="input-group">

                                    <div className="input-wrapper">

                                        <FaLock />

                                        <input
                                            type="password"
                                            aria-label="Senha"
                                            autoComplete="new-password"
                                            required
                                            placeholder="Crie uma senha"
                                            value={senha}
                                            onChange={(e) =>
                                                setSenha(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="input-group">

                                    <div className="input-wrapper">

                                        <FaLock />

                                        <input
                                            type="password"
                                            aria-label="Confirme sua senha"
                                            autoComplete="new-password"
                                            required
                                            placeholder="Confirme sua senha"
                                            value={confirmarSenha}
                                            onChange={(e) =>
                                                setConfirmarSenha(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>


                                {erro && (
                                    <p className="error-message">
                                        {erro}
                                    </p>
                                )}

                                {mensagem && (
                                    <p className="success-message">
                                        {mensagem}
                                    </p>
                                )}


                                <button
                                    type="submit"
                                    className="main-button"
                                >
                                    Criar Conta
                                </button>

                            </form>

                        </>

                    )}

                </section>

            </div>

        </main>
    );
}

export default Login;
