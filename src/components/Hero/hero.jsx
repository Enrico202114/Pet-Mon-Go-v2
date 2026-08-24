import "./hero.css";
import { FaPaw } from "react-icons/fa";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-background"></div>

            <div className="hero-overlay"></div>

            <div className="hero-content">

                <div className="hero-text">

                    <h1>
                        Organize os
                        <br />
                        cuidados do seu
                        <br />
                        pet de forma <span>fácil</span>
                        <br />
                        e <span>prático!</span>
                    </h1>

                    <p>
                        Organize os cuidados do seu pet e nunca
                        <br />
                        mais esqueça de tarefas importantes.
                    </p>

                </div>

                <div className="hero-buttons">

                    <button className="btn-start">
                        <FaPaw />
                        <span>Começar agora</span>
                    </button>

                    <button className="btn-more">
                        Saiba mais
                    </button>

                </div>

            </div>

            <div className="hero-wave"></div>

        </section>
    );
}

export default Hero;