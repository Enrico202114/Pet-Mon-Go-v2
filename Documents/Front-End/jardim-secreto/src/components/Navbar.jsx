import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        🌵 Jardim Secreto
      </div>

      <nav>
        <ul className="menu">
          <li><a href="#">Início</a></li>
          <li><a href="#">Cactos</a></li>
          <li><a href="#">Suculentas</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </nav>

      <div className="icons">
        <button>🛒</button>
        <button>👤</button>
      </div>

    </header>
  );
}

export default Navbar;