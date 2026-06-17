import "./AccountSidebar.css";
import {
  FaTimes,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaInfo,
  FaBell,
} from "react-icons/fa";

function AccountSidebar({ isOpen, closeSidebar }) {
  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      <aside className={`account-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Conta</h2>

          <button onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          <button className="sidebar-btn">
            <FaSignInAlt />
            Entrar
          </button>

          <button className="sidebar-btn">
            <FaUserPlus />
            Criar Conta
          </button>

          <button className="sidebar-btn">
            <FaInfo />
            Sobre o Pet Mon Go
          </button>

          <button className="sidebar-btn">
            <FaBell />
            Configurações
          </button>
        </div>
      </aside>
    </>
  );
}

export default AccountSidebar;