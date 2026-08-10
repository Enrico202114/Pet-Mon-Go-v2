import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-texto">
        <h1>Leve um pouco de natureza para sua casa</h1>

        <p>
          Encontre cactos e suculentas perfeitos para transformar
          seu espaço em um cantinho mais verde.
        </p>

        <button>Conheça nossas plantas</button>
      </div>

      <div className="hero-imagem">
        <img
          src="https://images.unsplash.com/photo-1459411621453-7b03977f4bfc"
          alt="Cactos e suculentas"
        />
      </div>

    </section>
  );
}

export default Hero;