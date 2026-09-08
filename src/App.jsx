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

  function handleLogin(tutorLogado) {

    setTutor(tutorLogado);

    localStorage.setItem(
      "petmon_tutor",
      JSON.stringify(tutorLogado)
    );

    setTela("home");
  }


  function handleLogout() {

    setTutor(null);

    localStorage.removeItem("petmon_tutor");

    setModoFamilia(null);

    setTela("home");
  }

  function handleOpenFamily() {

    setModoFamilia(null);

    setTela("family");
  }

  function handleCreateFamily() {

    setModoFamilia("criar");

    setTela("family");
  }

if (tela === "profile") {
    return (
        <Profile
            tutor={tutor}
            onBack={() => setTela("home")}
            onOpenFamily={() => {
                setModoFamilia(null);
                setTela("family");
            }}
        />
    );
}

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

  if (tela === "login") {

    return (
      <Login
        modoInicial="login"
        onLogin={handleLogin}
      />
    );

  }

  if (tela === "register") {

    return (
      <Login
        modoInicial="register"
        onLogin={handleLogin}
      />
    );

  }

  return (
    <Home
      onOpenLogin={() => setTela("login")}

      onOpenRegister={() =>
        setTela("register")
      }

      onOpenProfile={() =>
        setTela("profile")
      }

      onOpenFamily={handleOpenFamily}

      onCreateFamily={handleCreateFamily}

      tutor={tutor}

      onLogout={handleLogout}
    />
  );
}

export default App;