import Navbar from "../components/Navbar";
import Hero from "../components/Hero/hero";
import { FaCalendarAlt, FaBell, FaClipboardList, FaHeart, FaArrowRight } from "react-icons/fa";
import "./Home.css";
import alimentacaoImg from "../assets/alimentacao.jpg";
import passeiosImg from "../assets/passeios.jpg";
import medicacaoImg from "../assets/medicacao.jpg";

function Home({
  onOpenLogin,
  onOpenRegister,
  onOpenProfile,
  onOpenSettings,
  onOpenPets,
  onOpenDashboard,
  onOpenAbout,
  tutor,
  onLogout,
  onOpenFamily,
  onCreateFamily,
  familia,
}) {
  return (
    <div className="home-page">

      <Navbar
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onOpenProfile={onOpenProfile}
        onOpenSettings={onOpenSettings}
        onOpenAbout={onOpenAbout}
        onOpenPets={onOpenPets}
        onOpenDashboard={onOpenDashboard}
        onOpenFamily={onOpenFamily}
        onCreateFamily={onCreateFamily}
        familia={familia}
        tutor={tutor}
        onLogout={onLogout}
      />

      <Hero
        onOpenRegister={onOpenRegister}
      />

      <section className="why-section" id="sobre">

        <div className="section-title">
          <span className="section-line"></span>

          <div>
            <h2>Por que escolher o Pet Mon Go?</h2>

            <p>
              Tudo para deixar o cuidado com seu pet mais simples,
              organizado e tranquilo.
            </p>
          </div>

          <span className="section-line"></span>
        </div>


        <div className="why-cards">

          <div className="why-card">

            <div className="why-icon">
              <FaCalendarAlt />
            </div>

            <h3>Organize tudo</h3>

            <p>
              Organize os cuidados e acompanhe
              a rotina do seu pet.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              <FaBell />
            </div>

            <h3>Receba lembretes</h3>

            <p>
              Lembre-se de vacinas, consultas,
              remédios e muito mais.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              <FaClipboardList />
            </div>

            <h3>Acompanhe tudo</h3>

            <p>
              Tenha as informações importantes
              do seu pet sempre organizadas.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              <FaHeart />
            </div>

            <h3>Cuide com carinho</h3>

            <p>
              Mais organização para oferecer
              o melhor cuidado ao seu pet.
            </p>

          </div>

        </div>

      </section>

      <section className="services-section">

        <div className="services-header">

          <div>

            <h2>Cuidados que fazem a diferença</h2>

            <p>
              Acompanhe os principais cuidados do seu pet.
            </p>

          </div>


          <button
            className="services-all-btn"
            type="button"
            onClick={onOpenDashboard}
            disabled={!tutor}
            aria-label={tutor ? "Abrir meu painel" : "Entre para acessar seu painel"}
          >
            Ver todos

            <span>
              <FaArrowRight />
            </span>
          </button>

        </div>


        <div className="service-cards">

          <article className="service-card service-card-food">

             <img
                src={alimentacaoImg}
                alt="Gato se alimentando"
                className="service-image"
            />

            <div className="service-content">

              <span>02</span>

              <h3>Alimentação</h3>

              <p>
                Acompanhe a alimentação e a
                rotina do seu pet.
              </p>

            </div>

          </article>


          <article className="service-card service-card-walk">

             <img
                  src={passeiosImg}
                  alt="Cachorro passeando"
                  className="service-image"
              />

            <div className="service-content">

              <span>03</span>

              <h3>Passeios</h3>

              <p>
                Organize os passeios e mantenha
                seu pet ativo.
              </p>

            </div>

          </article>


          <article className="service-card service-card-medicine">

             <img
                  src={medicacaoImg}
                  alt="Gato recebendo medicação"
                  className="service-image"
              />

            <div className="service-content">

              <span>04</span>

              <h3>Medicação</h3>

              <p>
                Acompanhe os medicamentos e
                horários importantes.
              </p>

            </div>

          </article>

        </div>

      </section>

      <section className="cta-section" id="contato">

        <div className="cta-card">

          <div className="cta-icon">
            <FaHeart />
          </div>


          <div className="cta-text">

            <h2>
              Comece agora a cuidar
              <br />
              melhor do seu pet!
            </h2>

            <p>
              Tenha tudo organizado em um só lugar
              e nunca mais esqueça um cuidado importante.
            </p>

          </div>


          <div className="cta-actions">

            <button
              type="button"
              className="cta-primary"
              onClick={onOpenRegister}
            >
              Criar conta
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
