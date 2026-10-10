import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Family from "./pages/Family";
import Pets from "./pages/Pets";
import Dashboard from "./pages/Dashboard";
import CadastroPet from "./pages/CadastroPet";
import Settings from "./pages/Settings";

function App() {
  const tutorSalvo = localStorage.getItem("petmon_tutor");

  const [tela, setTela] = useState("home");

  const [tutor, setTutor] = useState(
    tutorSalvo ? JSON.parse(tutorSalvo) : null
  );

  const [modoFamilia, setModoFamilia] = useState(null);

  const [pets, setPets] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("petmon_pets")) || [];
    } catch {
      return [];
    }
  });

  const [petSelecionado, setPetSelecionado] = useState(null);

  function handleLogin(tutorLogado) {
    setTutor(tutorLogado);
    localStorage.setItem("petmon_tutor", JSON.stringify(tutorLogado));
    setTela("dashboard");
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

  function handleSavePet(novoPet) {
    const petsAtualizados = [...pets, novoPet];

    setPets(petsAtualizados);
    localStorage.setItem("petmon_pets", JSON.stringify(petsAtualizados));

    setTela("pets");
  }

  if (tela === "dashboard") {
    return (
      <Dashboard
        tutor={tutor}
        onHome={() => setTela("home")}
        onOpenProfile={() => setTela("profile")}
        onPets={() => setTela("pets")}
        onFamily={handleOpenFamily}
        onSettings={() => setTela("settings")}
        onLogout={handleLogout}
      />
    );
  }

  if (tela === "profile") {
    return (
      <Profile
          tutor={tutor}
          pets={pets}
          onHome={() => setTela("dashboard")}
          onMinhaFamilia={() => {
              setModoFamilia(null);
              setTela("family");
          }}
          onCriarFamilia={() => {
              setModoFamilia("criar");
              setTela("family");
          }}
          onOpenPets={() => setTela("pets")}
          onOpenSettings={() => setTela("settings")}
          onLogout={handleLogout}
          onAccountDeleted={handleLogout}
      />
    );
  }

  if (tela === "settings") {
  return (
    <Settings
      tutor={tutor}
      onHome={() => setTela("dashboard")}
      onOpenProfile={() => setTela("profile")}
      onPets={() => setTela("pets")}
      onFamily={handleOpenFamily}
      onSettings={() => setTela("settings")}
      onLogout={handleLogout}
    />
  );
}

  
  if (tela === "family") {
    return (
      <Family
        tutor={tutor}
        modoFamilia={modoFamilia}
        onCreateFamily={() => {
          alert("A criação de família ainda precisa ser conectada ao backend.");
        }}
        onLeaveFamily={() => {
          setModoFamilia(null);
          setTela("dashboard");
        }}
        onBack={() => {
          setModoFamilia(null);
          setTela("dashboard");
        }}
        onOpenProfile={() => {
          setModoFamilia(null);
          setTela("profile");
        }}
        onHome={() => setTela("dashboard")}
        onPets={() => setTela("pets")}
        onFamily={handleOpenFamily}
        onSettings={() => setTela("settings")}
        onLogout={handleLogout}
      />
    );
  }

  if (tela === "pets") {
  return (
    <Pets
      pets={pets}

      onHome={() => setTela("dashboard")}
      onOpenProfile={() => setTela("profile")}
      onPets={() => setTela("pets")}

      onFamily={handleOpenFamily}

      onSettings={() => setTela("settings")}

      onLogout={handleLogout}

      onAddPet={() => {
        setPetSelecionado(null);
        setTela("cadastroPet");
      }}

      onOpenPet={(pet) => {
        setPetSelecionado(pet);
        alert(`Pet selecionado: ${pet.nome}`);
      }}
    />
  );
}

  if (tela === "cadastroPet") {
    return (
      <CadastroPet
        onBack={() => setTela("pets")}
        onSave={handleSavePet}
      />
    );
  }

  if (tela === "login") {
    return <Login modoInicial="login" onLogin={handleLogin} />;
  }

  if (tela === "register") {
    return <Login modoInicial="register" onLogin={handleLogin} />;
  }

  return (
    <Home
      onOpenLogin={() => setTela("login")}
      onOpenRegister={() => setTela("register")}
      onOpenProfile={() => setTela("profile")}
      onOpenFamily={handleOpenFamily}
      onCreateFamily={handleCreateFamily}
      tutor={tutor}
      onLogout={handleLogout}
      onOpenDashboard={() => setTela("dashboard")}
    />
  );
}

export default App;
