import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Family from "./pages/Family";
import Pets from "./pages/Pets";
import Dashboard from "./pages/Dashboard";
import CadastroPet from "./pages/CadastroPet";
import Settings from "./pages/Settings";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import "./theme.css";

function getFamilyStorageKey(email) {
  return `petmon_familia_${encodeURIComponent(email || "sem-email")}`;
}
function getPetStorageKey(email) {
  return `petmon_pets_${encodeURIComponent(email || "sem-email")}`;
}
function normalizeFamilies(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function App() {
  const [tela, setTela] = useState("home");
  const [tutor, setTutor] = useState(() => {
    try { return JSON.parse(localStorage.getItem("petmon_tutor")) || null; }
    catch { return null; }
  });
  const [temaEscuro, setTemaEscuro] = useState(
    () => localStorage.getItem("petmon_tema") === "escuro"
  );
  const [familias, setFamilias] = useState(() => {
    try {
      const email = tutor?.emailtutor || tutor?.email;
      return normalizeFamilies(JSON.parse(localStorage.getItem(getFamilyStorageKey(email))));
    } catch { return []; }
  });
  const familia = familias[0] || null;
  const [pets, setPets] = useState(() => {
    try {
      const email = tutor?.emailtutor || tutor?.email;
      const scoped = localStorage.getItem(getPetStorageKey(email));
      if (scoped !== null) return JSON.parse(scoped) || [];
      const legacy = localStorage.getItem("petmon_pets");
      if (legacy && email) {
        localStorage.setItem(getPetStorageKey(email), legacy);
        localStorage.removeItem("petmon_pets");
        return JSON.parse(legacy) || [];
      }
      return [];
    } catch { return []; }
  });
  const [petEmEdicao, setPetEmEdicao] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.tema = temaEscuro ? "escuro" : "claro";
    localStorage.setItem("petmon_tema", temaEscuro ? "escuro" : "claro");
  }, [temaEscuro]);

  function handleLogin(tutorLogado) {
    setTutor(tutorLogado);
    localStorage.setItem("petmon_tutor", JSON.stringify(tutorLogado));
    const email = tutorLogado?.emailtutor || tutorLogado?.email;
    try {
      setFamilias(normalizeFamilies(JSON.parse(localStorage.getItem(getFamilyStorageKey(email)))));
      setPets(JSON.parse(localStorage.getItem(getPetStorageKey(email))) || []);
    } catch {
      setFamilias([]);
      setPets([]);
    }
    setTela("dashboard");
  }

  function handleLogout() {
    setTutor(null);
    setPets([]);
    localStorage.removeItem("petmon_tutor");
    setTela("home");
  }

  function handleSaveFamily() {
    const nomeTutor = tutor?.nometutor || tutor?.nome || "Tutor";
    const novaFamilia = {
      nome: `Família de ${nomeTutor}`,
      codigo: Math.random().toString(36).slice(2, 8).toUpperCase(),
      responsavel: nomeTutor,
      criador: true,
      privada: false,
      emailResponsavel: tutor?.emailtutor || tutor?.email || "",
    };
    const atualizadas = [...familias, novaFamilia];
    setFamilias(atualizadas);
    localStorage.setItem(getFamilyStorageKey(tutor?.emailtutor || tutor?.email), JSON.stringify(atualizadas));
  }

  function handleUpdateFamily(family, changes) {
    const updated = familias.map((item) => item.codigo === family.codigo && item.criador
      ? { ...item, nome: changes.nome.trim(), privada: Boolean(changes.privada) }
      : item);
    setFamilias(updated);
    localStorage.setItem(getFamilyStorageKey(tutor?.emailtutor || tutor?.email), JSON.stringify(updated));
  }

  function handleLeaveFamily(codigo) {
    const atualizadas = familias.filter((item) => item.codigo !== codigo);
    setFamilias(atualizadas);
    const key = getFamilyStorageKey(tutor?.emailtutor || tutor?.email);
    if (atualizadas.length) localStorage.setItem(key, JSON.stringify(atualizadas));
    else localStorage.removeItem(key);
  }

  async function handleUpdateTutor(alteracoes) {
    if (!tutor?.idtutor) throw new Error("Não foi possível identificar sua conta.");
    const resposta = await fetch(`http://localhost:3000/tutores/${tutor.idtutor}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alteracoes),
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.message || "Não foi possível atualizar sua conta.");

    const dadosPublicos = Object.fromEntries(
      Object.entries(alteracoes).filter(([campo]) => campo !== "senhatutor" && campo !== "senhaAtual")
    );
    const atualizado = { ...tutor, ...dadosPublicos };
    const emailAntigo = tutor.emailtutor || tutor.email;
    const emailNovo = atualizado.emailtutor || atualizado.email;
    if (emailAntigo !== emailNovo) {
      if (familias.length) {
        localStorage.setItem(getFamilyStorageKey(emailNovo), JSON.stringify(familias));
        localStorage.removeItem(getFamilyStorageKey(emailAntigo));
      }
      if (pets.length) {
        localStorage.setItem(getPetStorageKey(emailNovo), JSON.stringify(pets));
        localStorage.removeItem(getPetStorageKey(emailAntigo));
      }
    }
    setTutor(atualizado);
    localStorage.setItem("petmon_tutor", JSON.stringify(atualizado));
  }

  function handleSaveAvatar(fotoPerfil) {
    const atualizado = { ...tutor, fotoPerfil };
    setTutor(atualizado);
    localStorage.setItem("petmon_tutor", JSON.stringify(atualizado));
  }

  async function handleDeleteAccount() {
    if (!tutor?.idtutor) throw new Error("Não foi possível identificar sua conta.");
    const resposta = await fetch(`http://localhost:3000/tutores/${tutor.idtutor}`, { method: "DELETE" });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.message || "Não foi possível excluir sua conta.");
    localStorage.removeItem(getFamilyStorageKey(tutor.emailtutor || tutor.email));
    localStorage.removeItem(getPetStorageKey(tutor.emailtutor || tutor.email));
    setFamilias([]);
    handleLogout();
  }

  function handleSavePet(novoPet) {
    const nome = String(novoPet.nome || "Pet").trim();
    const pet = { ...novoPet, nome: nome ? nome[0].toLocaleUpperCase("pt-BR") + nome.slice(1) : "Pet", registradoPor: tutor?.nometutor || tutor?.nome || "Tutor", registradoEmail: tutor?.emailtutor || tutor?.email || "" };
    const atualizados = petEmEdicao ? pets.map((item) => item.id === petEmEdicao.id ? pet : item) : [...pets, pet];
    setPets(atualizados);
    localStorage.setItem(getPetStorageKey(tutor?.emailtutor || tutor?.email), JSON.stringify(atualizados));
    setPetEmEdicao(null);
    setTela("pets");
  }

  function handleDeletePet(pet) {
    if (!window.confirm(`Excluir ${pet.nome}?`)) return;
    const updated = pets.filter((item) => item.id !== pet.id);
    setPets(updated);
    localStorage.setItem(getPetStorageKey(tutor?.emailtutor || tutor?.email), JSON.stringify(updated));
  }

  const protegidas = ["dashboard", "profile", "settings", "family", "pets", "cadastroPet"];
  if (!tutor && protegidas.includes(tela)) {
    return <ProtectedRoute allowed={false} fallback={<Login modoInicial="login" onLogin={handleLogin} onHome={() => setTela("home")} />} />;
  }

  const comum = {
    onHome: () => setTela("home"),
    onDashboard: () => setTela("dashboard"),
    onOpenProfile: () => setTela("profile"),
    onPets: () => setTela("pets"),
    onFamily: () => setTela("family"),
    onSettings: () => setTela("settings"),
    onLogout: handleLogout,
  };

  if (tela === "dashboard") return <Dashboard tutor={tutor} pets={pets} {...comum} />;
  if (tela === "profile") return (
    <Profile tutor={tutor} pets={pets} familias={familias} onUpdateTutor={handleUpdateTutor}
      onSaveAvatar={handleSaveAvatar} onDeleteAccount={handleDeleteAccount}
      onMinhaFamilia={() => setTela("family")} onCriarFamilia={() => setTela("family")}
      onOpenPets={() => setTela("pets")} onOpenSettings={() => setTela("settings")} {...comum} />
  );
  if (tela === "settings") return <Settings tutor={tutor} temaEscuro={temaEscuro}
    onToggleTema={() => setTemaEscuro((value) => !value)} {...comum} />;
  if (tela === "about") return <About {...comum} />;
  if (tela === "family") return <Family tutor={tutor} familias={familias} familia={familia} pets={pets}
    onCreateFamily={handleSaveFamily} onLeaveFamily={handleLeaveFamily} onUpdateFamily={handleUpdateFamily} {...comum} />;
  if (tela === "pets") return <Pets pets={pets} onAddPet={() => { setPetEmEdicao(null); setTela("cadastroPet"); }} onEditPet={(pet) => { setPetEmEdicao(pet); setTela("cadastroPet"); }} onDeletePet={handleDeletePet} {...comum} />;
  if (tela === "cadastroPet") return <CadastroPet petInicial={petEmEdicao} onBack={() => setTela("pets")} onSave={handleSavePet} {...comum} />;
  if (tela === "login") return <Login modoInicial="login" onLogin={handleLogin} onHome={() => setTela("home")} />;
  if (tela === "register") return <Login modoInicial="register" onLogin={handleLogin} onHome={() => setTela("home")} />;

  return <Home tutor={tutor} familia={familia} onLogout={handleLogout}
    onOpenLogin={() => setTela("login")} onOpenRegister={() => setTela("register")}
    onOpenProfile={() => setTela("profile")} onOpenSettings={() => setTela("settings")}
    onOpenPets={() => setTela("pets")} onOpenFamily={() => setTela("family")} onOpenAbout={() => setTela("about")}
    onCreateFamily={() => setTela("family")} onOpenDashboard={() => setTela("dashboard")} />;
}

export default App;
