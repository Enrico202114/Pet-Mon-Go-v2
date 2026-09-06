import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const [tela, setTela] = useState("home");
  const [tutor, setTutor] = useState(null);

  function handleLogin(tutorLogado) {
    setTutor(tutorLogado);
    setTela("home");
  }

  function handleLogout() {
    setTutor(null);
    setTela("home");
  }

  if (tela === "profile") {
    return (
      <Profile
        tutor={tutor}
        onBack={() => setTela("home")}
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
      onOpenRegister={() => setTela("register")}
      onOpenProfile={() => setTela("profile")}
      tutor={tutor}
      onLogout={handleLogout}
    />
  );
}

export default App;