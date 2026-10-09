
import "./Navbar.css";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import AccountSidebar from "./AccountSidebar";

function Navbar({
  onOpenLogin,
  onOpenRegister,
  onOpenProfile,
  onOpenDashboard,
  onOpenFamily,
  onCreateFamily,
  tutor,
  onLogout,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function abrirInicio() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav className="navbar">
      <button
        type="button"
        className="navbar-logo"
        onClick={abrirInicio}
        aria-label="Voltar ao início da página"
      >
        <img src={logo} alt="Pet Mon Go" />
      </button>

      <ul className="navbar-links">
        <li>
          <button type="button" onClick={abrirInicio}>
            Início
          </button>
        </li>
        <li>
          <a href="#servicos">Serviços</a>
        </li>
        <li>
          <a href="#sobre">Sobre</a>
        </li>
        <li>
          <a href="#contato">Contato</a>
        </li>
      </ul>

      <button
        type="button"
        className="navbar-account"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaUserCircle />
        Conta
      </button>

      <AccountSidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onOpenProfile={onOpenProfile}
        onOpenDashboard={onOpenDashboard}
        onOpenFamily={onOpenFamily}
        onCreateFamily={onCreateFamily}
        tutor={tutor}
        onLogout={onLogout}
      />
    </nav>
  );
}

export default Navbar;
