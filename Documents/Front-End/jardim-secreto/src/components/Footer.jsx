import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-logo">
        <h2>🌵 Jardim Secreto</h2>

        <p>
          Cactos e suculentas para deixar sua casa mais verde.
        </p>
      </div>

      <div className="footer-links">

        <h3>Links</h3>

        <a href="#">Início</a>
        <a href="#">Cactos</a>
        <a href="#">Suculentas</a>
        <a href="#">Contato</a>

      </div>

      <div className="footer-contato">

        <h3>Contato</h3>

        <p>contato@jardimsecreto.com</p>
        <p>(17) 99999-9999</p>

      </div>

    </footer>
  );
}

export default Footer;