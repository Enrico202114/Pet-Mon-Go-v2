
import {
  FaDog,
  FaUsers,
  FaSyringe,
  FaCalendarAlt,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa";

import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import FooterPanel from "../components/FooterPanel";

function Dashboard({
  tutor,
  pets = [],
  onHome,
  onDashboard,
  onOpenProfile,
  onPets,
  onFamily,
  onSettings,
  onLogout,
}) {
  const nomeTutor =
    tutor?.nometutor || tutor?.nome || tutor?.name || "Tutor";

  return (
    <div className="dashboard">
      <Sidebar
        paginaAtiva="painel"
        onHome={onHome}
        onDashboard={onDashboard}
        onOpenProfile={onOpenProfile}
        onPets={onPets}
        onFamily={onFamily}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Meu Painel</h1>
            <p>
              Olá, {nomeTutor}! Vamos cuidar bem dos seus pets?
            </p>
          </div>

        </header>

        <section className="dashboard-welcome">
          <div className="dashboard-welcome-content">
            <span>UM DIA DE CUIDADOS</span>
            <h2>Todo carinho merece organização.</h2>

            <button
              className="dashboard-primary-button"
              onClick={onPets}
            >
              Ver meus pets
              <FaArrowRight />
            </button>
          </div>

        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>Resumo dos cuidados</h2>
            </div>
          </div>

          <div className="dashboard-summary-grid">
            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon pets-icon">
                <FaDog />
              </div>

              <div>
                <span>Meus pets</span>
                <p>Consulte seus animais cadastrados.</p>
              </div>

              <button
                aria-label="Acessar meus pets"
                onClick={onPets}
              >
                <FaArrowRight />
              </button>
            </article>

            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon routine-icon">
                <FaClipboardList />
              </div>

              <div>
                <span>Rotinas</span>
                <p>Cadastre um pet para organizar os cuidados diários.</p>
              </div>
              <button className="dashboard-summary-action" type="button" aria-label="Acessar meus pets para organizar rotinas" onClick={onPets}>
                <FaArrowRight />
              </button>
            </article>

            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon vaccine-icon">
                <FaSyringe />
              </div>

              <div>
                <span>Vacinas</span>
                <p>Cadastre um pet para acompanhar as vacinas.</p>
              </div>
              <button className="dashboard-summary-action" type="button" aria-label="Acessar meus pets para acompanhar vacinas" onClick={onPets}>
                <FaArrowRight />
              </button>
            </article>

            <article className="dashboard-summary-card">
              <div className="dashboard-summary-icon family-icon">
                <FaUsers />
              </div>

              <div>
                <span>Família</span>
                <p>Organize os dados da família neste dispositivo.</p>
              </div>

              <button
                aria-label="Acessar família"
                onClick={onFamily}
              >
                <FaArrowRight />
              </button>
            </article>
          </div>
        </section>

        <section className="dashboard-section dashboard-bottom-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>Organize sua rotina</h2>
            </div>
          </div>

          {pets.length ? <div className="dashboard-care-tables">
            {pets.map((pet) => <article className="dashboard-care-table-card" key={pet.id || pet.idpet}>
              <h3>{pet.nome} <small>({pet.registradoPor || "Tutor não informado"} registrou)</small></h3>
              {[["Vacinas", pet.vacinas || []], ["Medicações", pet.medicacoes || []], ["Passeios", pet.passeios || []]].map(([title, rows]) => <section key={title}>
                <h4>{title}</h4><div className="dashboard-table-scroll"><table><thead><tr>{title === "Vacinas" ? <><th>Vacina</th><th>Aplicação</th><th>Próxima dose</th></> : title === "Medicações" ? <><th>Medicamento</th><th>Dosagem</th><th>Período</th></> : <><th>Data e hora</th><th>Duração</th><th>Local</th></>}</tr></thead>
                  <tbody>{rows.length ? rows.map((row, i) => <tr key={row.id || row.idvacina || row.idmedicacao || row.idpasseio || i}>{title === "Vacinas" ? <><td>{row.nomevacina}</td><td>{row.dataaplicacao}</td><td>{row.proximadose || "—"}</td></> : title === "Medicações" ? <><td>{row.nomemedicacao}</td><td>{row.dosagemmedicamento || "—"}</td><td>{row.datainicio || "—"} – {row.datafim || "—"}</td></> : <><td>{row.datahora}</td><td>{row.duracaoMinutos} min</td><td>{row.local || "—"}</td></>}</tr>) : <tr><td colSpan="3">Nenhum registro cadastrado.</td></tr>}</tbody>
                </table></div></section>)}
            </article>)}
          </div> : <div className="dashboard-empty-state">
            <div className="dashboard-empty-icon">
              <FaCalendarAlt />
            </div>

            <h3>Seus cuidados começam aqui</h3>

            <p>
              Cadastre seus pets para começarmos a organizar
              as informações de cuidado.
            </p>

            <button
              className="dashboard-secondary-button"
              onClick={onPets}
            >
              Acessar meus pets
            </button>
          </div>}
        </section>

        <FooterPanel />
      </main>
    </div>
  );
}

export default Dashboard;
