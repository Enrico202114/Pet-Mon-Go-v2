import "./hero.css";
import {FaPaw, FaSyringe, FaBowlFood, FaDog, FaPills} from "react-icons/fa6";

function Hero({ onOpenRegister }) {
    return (
        <>
            <section className="hero">

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

                        <div className="hero-buttons">

                            <button
                                className="btn-start"
                                onClick={onOpenRegister}
                            >
                                <FaPaw />
                                <span>Começar agora</span>
                            </button>

                            <button className="btn-more">
                                Saiba mais
                            </button>

                        </div>

                    </div>

                </div>

                <div className="hero-wave"></div>

            </section>

            <section className="care-section">

                <h2>
                    Você já esqueceu algum cuidado importante com seu pet?
                </h2>

                <div className="care-cards">

                    <div className="care-card">
                        <FaSyringe />
                        <span>Vacinas</span>
                    </div>

                    <div className="care-card">
                        <FaBowlFood />
                        <span>Alimentação</span>
                    </div>

                    <div className="care-card">
                        <FaDog />
                        <span>Passeios</span>
                    </div>

                    <div className="care-card">
                        <FaPills />
                        <span>Medicação</span>
                    </div>

                </div>

            </section>
        </>
    );
}

export default Hero;