import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Family from "./pages/Family";

function App() {

  const tutorSalvo = localStorage.getItem("petmon_tutor");

  const [tela, setTela] = useState("home");

  const [tutor, setTutor] = useState(
    tutorSalvo ? JSON.parse(tutorSalvo) : null
  );

  const [modoFamilia, setModoFamilia] = useState(null);


  // =========================
  // LOGIN
  // =========================

  function handleLogin(tutorLogado) {

    setTutor(tutorLogado);

    localStorage.setItem(
      "petmon_tutor",
      JSON.stringify(tutorLogado)
    );

    setTela("home");
  }


  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {

    setTutor(null);

    localStorage.removeItem("petmon_tutor");

    setModoFamilia(null);

    setTela("home");
  }


  // =========================
  // ABRIR FAMÍLIA
  // =========================

  function handleOpenFamily() {

    setModoFamilia(null);

    setTela("family");
  }


  // =========================
  // CRIAR FAMÍLIA
  // =========================

  function handleCreateFamily() {

    setModoFamilia("criar");

    setTela("family");
  }


  // =========================
  // PERFIL
  // =========================

  if (tela === "profile") {

    return (
      <Profile
        tutor={tutor}

        // Voltar para Home
        onHome={() => {
          setTela("home");
        }}

        // Abrir Minha Família
        onMinhaFamilia={() => {
          setModoFamilia(null);
          setTela("family");
        }}

        // Abrir Criar Família
        onCriarFamilia={() => {
          setModoFamilia("criar");
          setTela("family");
        }}

        // Sair da conta
        onLogout={handleLogout}

        // Excluir conta
        onAccountDeleted={handleLogout}
      />
    );
  }


  // =========================
  // FAMÍLIA
  // =========================

  if (tela === "family") {

    return (
      <Family
        tutor={tutor}

        modoInicial={modoFamilia}

        onBack={() => {
          setModoFamilia(null);
          setTela("home");
        }}

        onOpenProfile={() => {
          setModoFamilia(null);
          setTela("profile");
        }}
      />
    );
  }


  // =========================
  // LOGIN
  // =========================

  if (tela === "login") {

    return (
      <Login
        modoInicial="login"
        onLogin={handleLogin}
      />
    );
  }


  // =========================
  // CADASTRO
  // =========================

  if (tela === "register") {

    return (
      <Login
        modoInicial="register"
        onLogin={handleLogin}
      />
    );
  }


  // =========================
  // HOME
  // =========================

  return (
    <Home
      onOpenLogin={() => setTela("login")}

      onOpenRegister={() => {
        setTela("register");
      }}

      onOpenProfile={() => {
        setTela("profile");
      }}

      onOpenFamily={handleOpenFamily}

      onCreateFamily={handleCreateFamily}

      tutor={tutor}

      onLogout={handleLogout}
    />
  );
}

export default App;