import "./Navbar.css";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import {useState} from "react";
import AccountSidebar from "./AccountSidebar";

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Pet Mon Go" />
      </div>

      <ul className="navbar-links">
        <li>Início</li>
        <li>Serviços</li>
        <li>Sobre</li>
        <li>Contato</li>
      </ul>

    <button className="navbar-account"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaUserCircle />
        Conta
    </button>
    <AccountSidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </nav>
  );
}

export default Navbar;