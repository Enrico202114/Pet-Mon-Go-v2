import {
    FaPaw,
    FaPlus,
    FaDog,
    FaCat,
    FaCalendarAlt,
    FaVenusMars,
    FaWeight
} from "react-icons/fa";

import DashboardSidebar from "../components/DashboardSidebar";
import "./Pets.css";
import "./Dashboard.css";

function Pets({
    pets = [],
    onAddPet,
    onOpenPet,
    onHome,
    onOpenProfile,
    onPets,
    onFamily,
    onSettings,
    onLogout
}) {

    return (
        <div className="dashboard">

            <DashboardSidebar
                paginaAtiva="pets"
                onHome={onHome}
                onOpenProfile={onOpenProfile}
                onPets={onPets}
                onFamily={onFamily}
                onSettings={onSettings}
                onLogout={onLogout}
            />

            <main className="dashboard-main pets-page">

                <section className="pets-container">

                    <div className="pets-header">

                        <div>
                            <span className="pets-eyebrow">
                                Pet Mon Go
                            </span>

                            <h1>Meus Pets</h1>

                            <p>
                                Tenha todas as informações dos seus pets
                                organizadas em um só lugar.
                            </p>
                        </div>

                        <button
                            className="add-pet-button"
                            onClick={onAddPet}
                        >
                            <FaPlus />
                            Adicionar pet
                        </button>

                    </div>

                    {pets.length === 0 ? (

                        <div className="pets-empty">

                            <div className="empty-paw">
                                <FaPaw />
                            </div>

                            <h2>Nenhum pet cadastrado</h2>

                            <p>
                                Cadastre seu primeiro pet para começar
                                a organizar os cuidados dele.
                            </p>

                            <button
                                className="empty-add-button"
                                onClick={onAddPet}
                            >
                                <FaPlus />
                                Cadastrar meu pet
                            </button>

                        </div>

                    ) : (

                        <div className="pets-grid">

                            {pets.map((pet) => (

                                <article
                                    className="pet-card"
                                    key={pet.id || pet.idpet}
                                    onClick={() => onOpenPet?.(pet)}
                                >

                                    <div className="pet-photo">

                                        {pet.foto ? (
                                            <img
                                                src={pet.foto}
                                                alt={pet.nome}
                                            />
                                        ) : (
                                            <FaPaw />
                                        )}

                                    </div>

                                    <div className="pet-info">

                                        <div className="pet-name">

                                            <div>
                                                <h2>{pet.nome}</h2>

                                                <span>
                                                    {pet.especie || "Pet"}
                                                </span>

                                                {pet.raca && (
                                                    <small>{pet.raca}</small>
                                                )}
                                            </div>

                                            {pet.especie === "Gato" ? (
                                                <FaCat />
                                            ) : (
                                                <FaDog />
                                            )}

                                        </div>

                                        <div className="pet-details">

                                            <span>
                                                <FaVenusMars />
                                                {pet.sexo || "Não informado"}
                                            </span>

                                            <span>
                                                <FaCalendarAlt />
                                                {pet.idade || "Idade não informada"}
                                            </span>

                                            <span>
                                                <FaWeight />
                                                {pet.peso || "Peso não informado"}
                                            </span>

                                        </div>

                                        <button
                                            className="pet-view-button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onOpenPet?.(pet);
                                            }}
                                        >
                                            Ver perfil
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Pets;