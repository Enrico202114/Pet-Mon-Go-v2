import { useState } from "react";
import {
    FaDog,
    FaPlus,
    FaCat,
    FaCalendarAlt,
    FaVenusMars,
    FaWeight
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import FooterPanel from "../components/FooterPanel";
import "./Pets.css";
import "./Dashboard.css";

function Pets({
    pets = [],
    onAddPet,
    onEditPet,
    onDeletePet,
    onHome,
    onDashboard,
    onOpenProfile,
    onPets,
    onFamily,
    onSettings,
    onLogout
}) {
    const [petSelecionado, setPetSelecionado] = useState(null);
    const [rotinaPet, setRotinaPet] = useState(null);
    const [rotina, setRotina] = useState({ alimento: "", horario: "", porcoes: "1" });

    function nomeExibido(nome) {
        const valor = String(nome || "Pet").trimStart();
        return valor ? valor.charAt(0).toLocaleUpperCase("pt-BR") + valor.slice(1) : "Pet";
    }

    return (
        <div className="dashboard">

            <Sidebar
                paginaAtiva="pets"
                onHome={onHome}
                onDashboard={onDashboard}
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

                            <div className="empty-pet-icon">
                                <FaDog />
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
                                >

                                    <div className="pet-photo">

                                        {pet.foto ? (
                                            <img
                                                src={pet.foto}
                                                alt={pet.nome}
                                            />
                                        ) : (
                                            <FaDog />
                                        )}

                                    </div>

                                    <div className="pet-info">

                                        <div className="pet-name">

                                            <div>
                                                <h2>{nomeExibido(pet.nome)}</h2>

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
                                            type="button"
                                            className="pet-view-button"
                                            onClick={() => {
                                                setPetSelecionado(pet);
                                            }}
                                        >
                                            Ver perfil
                                        </button>
                                        <div className="pet-card-actions">
                                          <button type="button" onClick={() => onEditPet?.(pet)}>Editar</button>
                                          <button type="button" onClick={() => onDeletePet?.(pet)}>Excluir</button>
                                          <button type="button" onClick={() => { setRotinaPet(pet); setRotina(JSON.parse(localStorage.getItem(`petmon_rotina_${pet.id || pet.idpet}`) || '{"alimento":"","horario":"","porcoes":"1"}')); }}>Rotina alimentar</button>
                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                    {rotinaPet && <div className="pet-modal-backdrop" onClick={() => setRotinaPet(null)}>
                      <section className="pet-modal feeding-routine-modal" role="dialog" aria-modal="true" aria-labelledby="feeding-title" onClick={(event) => event.stopPropagation()}>
                        <button type="button" className="pet-modal-close" aria-label="Fechar rotina" onClick={() => setRotinaPet(null)}>×</button>
                        <span className="pets-eyebrow">Rotina alimentar</span>
                        <h2 id="feeding-title">{nomeExibido(rotinaPet.nome)}</h2>
                        <label>Alimento<input value={rotina.alimento} onChange={(e) => setRotina({ ...rotina, alimento: e.target.value })} placeholder="Ex.: ração" /></label>
                        <label>Horário<input type="time" value={rotina.horario} onChange={(e) => setRotina({ ...rotina, horario: e.target.value })} required /></label>
                        <label>Refeições por dia<input type="number" min="1" max="12" value={rotina.porcoes} onChange={(e) => setRotina({ ...rotina, porcoes: e.target.value })} /></label>
                        <button type="button" className="pet-modal-done" onClick={() => { localStorage.setItem(`petmon_rotina_${rotinaPet.id || rotinaPet.idpet}`, JSON.stringify(rotina)); setRotinaPet(null); }}>Salvar rotina</button>
                      </section>
                    </div>}

                    {petSelecionado && (
                        <div className="pet-modal-backdrop" onClick={() => setPetSelecionado(null)}>
                            <section
                                className="pet-modal"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="pet-modal-title"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <button
                                    type="button"
                                    className="pet-modal-close"
                                    aria-label="Fechar perfil do pet"
                                    onClick={() => setPetSelecionado(null)}
                                >
                                    ×
                                </button>
                                <div className="pet-modal-heading">
                                    <div className="pet-modal-avatar">
                                        {petSelecionado.foto ? (
                                            <img src={petSelecionado.foto} alt="" />
                                        ) : (
                                            <FaDog />
                                        )}
                                    </div>
                                    <div>
                                        <span className="pets-eyebrow">Perfil do pet</span>
                                        <h2 id="pet-modal-title">{nomeExibido(petSelecionado.nome)}</h2>
                                        <p>{petSelecionado.especie || "Pet"}{petSelecionado.raca ? ` · ${petSelecionado.raca}` : ""}</p>
                                    </div>
                                </div>
                                <dl className="pet-modal-details">
                                    <div><dt>Sexo</dt><dd>{petSelecionado.sexo || "Não informado"}</dd></div>
                                    <div><dt>Idade</dt><dd>{petSelecionado.idade || "Não informada"}</dd></div>
                                    <div><dt>Peso</dt><dd>{petSelecionado.peso || "Não informado"}</dd></div>
                                </dl>
                                <button type="button" className="pet-modal-done" onClick={() => setPetSelecionado(null)}>
                                    Concluir
                                </button>
                            </section>
                        </div>
                    )}

                </section>

                <FooterPanel />

            </main>

        </div>
    );
}

export default Pets;
