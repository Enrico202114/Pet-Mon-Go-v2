import { useEffect, useState } from "react";

import {
  FaUsers,
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaPlus,
  FaSignInAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaPaw,
  FaStore,
  FaChevronRight,
  FaPen,
  FaArrowLeft
} from "react-icons/fa";

import logo from "../assets/logo.png";

import "./Family.css";

function Family({
  tutor,
  onBack,
  onOpenProfile,
  modoInicial = null
}) {

  const [familia, setFamilia] = useState(null);

  const [modo, setModo] = useState(modoInicial);

  const [nomefamilia, setNomefamilia] = useState("");
  const [codigofamilia, setCodigofamilia] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregarFamilia() {
    try {

      setCarregando(true);
      setErro("");

      if (!tutor) {
        setCarregando(false);
        return;
      }

      const respostaTutor = await fetch(
        `http://localhost:3000/tutores/${tutor.idtutor}`
      );

      const dadosTutor = await respostaTutor.json();

      if (!respostaTutor.ok) {
        throw new Error(
          dadosTutor.message ||
          "Erro ao buscar informações do tutor"
        );
      }

      if (!dadosTutor.idfamilia) {
        setFamilia(null);
        setCarregando(false);
        return;
      }

      const respostaFamilia = await fetch(
        `http://localhost:3000/familias/${dadosTutor.idfamilia}`
      );

      const dadosFamilia = await respostaFamilia.json();

      if (!respostaFamilia.ok) {
        throw new Error(
          dadosFamilia.message ||
          "Erro ao buscar família"
        );
      }

      setFamilia(dadosFamilia);

    } catch (error) {

      console.error(error);
      setErro(error.message);

    } finally {

      setCarregando(false);

    }
  }

  useEffect(() => {
    carregarFamilia();
  }, [tutor]);

  async function criarFamilia() {

    try {

      setMensagem("");
      setErro("");

      if (!nomefamilia.trim()) {
        setErro("Digite o nome da família.");
        return;
      }

      const resposta = await fetch(
        "http://localhost:3000/familias",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            nomefamilia: nomefamilia.trim(),
            idtutor: tutor.idtutor
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.message ||
          "Erro ao criar família."
        );
      }

      setMensagem("Família criada com sucesso!");

      setNomefamilia("");
      setModo(null);

      await carregarFamilia();

    } catch (error) {

      console.error(error);
      setErro(error.message);

    }
  }

  async function entrarFamilia() {

    try {

      setMensagem("");
      setErro("");

      if (!codigofamilia.trim()) {
        setErro("Digite o código da família.");
        return;
      }

      const resposta = await fetch(
        "http://localhost:3000/familias/entrar",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            codigofamilia:
              codigofamilia.trim().toUpperCase(),

            idtutor: tutor.idtutor
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.message ||
          "Erro ao entrar na família."
        );
      }

      setMensagem(
        "Você entrou na família com sucesso!"
      );

      setCodigofamilia("");
      setModo(null);

      await carregarFamilia();

    } catch (error) {

      console.error(error);
      setErro(error.message);

    }
  }

  async function sairFamilia() {

    if (!familia) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja sair desta família?"
    );

    if (!confirmar) return;

    try {

      setMensagem("");
      setErro("");

      const resposta = await fetch(
        `http://localhost:3000/familias/${familia.idfamilia}/sair/${tutor.idtutor}`,
        {
          method: "DELETE"
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.message ||
          "Erro ao sair da família."
        );
      }

      setMensagem(
        "Você saiu da família com sucesso!"
      );

      setFamilia(null);

    } catch (error) {

      console.error(error);
      setErro(error.message);

    }
  }

  if (carregando) {

    return (
      <div className="family-page">

        <div className="family-loading">

          <FaUsers />

          <p>
            Carregando família...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="family-page">

      {/* ==============================
          NAVBAR
      ============================== */}

      <header className="app-navbar">

        <div className="app-logo">
          <img src={logo} alt="Pet Mon Go" />
        </div>
        
        <div className="app-user">

        </div>

      </header>


      {/* ==============================
          LAYOUT
      ============================== */}

      <div className="family-layout">


        {/* ==============================
            SIDEBAR
        ============================== */}

        <aside className="family-sidebar">

          <button
            className="family-sidebar-item"
            onClick={onOpenProfile}
          >
            <FaUser />
            <span>Perfil</span>
          </button>

          <button className="family-sidebar-item">
            <FaPaw />
            <span>Meus Pets</span>
          </button>

          <button className="family-sidebar-item active">
            <FaUsers />
            <span>Família</span>
          </button>


          <button
            className="family-sidebar-logout"
            onClick={sairFamilia}
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>

        </aside>


        {/* ==============================
            CONTEÚDO
        ============================== */}

        <main className="family-content">

          <div className="family-page-title">

            <h1>
              Minha Família
            </h1>

            <p>
              Juntos cuidando de quem a gente ama.
            </p>

          </div>


          {mensagem && (
            <div className="family-message success">
              {mensagem}
            </div>
          )}


          {erro && (
            <div className="family-message error">
              {erro}
            </div>
          )}


          {/* ==============================
              POSSUI FAMÍLIA
          ============================== */}

          {familia && (

            <>

              {/* CARD PRINCIPAL */}

              <section className="family-hero-card">

                <div className="family-hero-info">

                  <div className="family-big-icon">
                    <FaUsers />
                  </div>

                  <div>

                    <h2>
                      {familia.nomefamilia}
                    </h2>

                    <p>
                      {familia.membros?.length || 0}{" "}
                      {familia.membros?.length === 1
                        ? "membro"
                        : "membros"}
                    </p>

                  </div>

                </div>


                <button className="family-edit-btn">
                  <FaPen />
                  Editar
                </button>


                <div className="family-paws">
                  <FaPaw />
                  <FaPaw />
                </div>

              </section>


              {/* GRID INFERIOR */}

              <div className="family-bottom-grid">


                {/* MEMBROS */}

                <section className="family-members-card">

                  <div className="family-section-header">

                    <div>

                      <h2>
                        Membros da família
                      </h2>

                      <p>
                        Pessoas que fazem parte da família
                      </p>

                    </div>

                  </div>


                  <div className="family-members-grid">

                    {familia.membros?.map(
                      (membro, index) => (

                        <div
                          className="family-member-card"
                          key={membro.idtutor}
                        >

                          <div className="member-avatar">
                            <FaUser />
                          </div>

                          <div className="member-data">

                            <strong>
                              {membro.nometutor}
                            </strong>

                            <span className="member-role">
                              {index === 0
                                ? "Tutor principal"
                                : "Membro"}
                            </span>

                            <span className="member-email">

                              <FaEnvelope />

                              {membro.emailtutor}

                            </span>

                          </div>

                          <FaChevronRight className="member-arrow" />

                        </div>

                      )
                    )}

                  </div>

                </section>


                {/* CARD LATERAL */}

                <aside className="family-love-card">

                  <div className="love-icon">
                    <FaUsers />
                  </div>

                  <h3>
                    Mais amor, mais cuidado!
                  </h3>

                  <p>
                    Uma família unida faz toda a
                    diferença na vida do seu pet.
                  </p>

                  <div className="love-paws">
                    <FaPaw />
                    <FaPaw />
                  </div>

                </aside>

              </div>


              {/* INFORMAÇÕES DA FAMÍLIA */}

              <section className="family-info-row">

                <div className="family-code-box">

                  <div className="info-icon">
                    <FaKey />
                  </div>

                  <div>

                    <span>
                      Código da família
                    </span>

                    <strong>
                      {familia.codigofamilia}
                    </strong>

                  </div>

                </div>


                <div className="family-date-box">

                  <div className="info-icon">
                    <FaCalendarAlt />
                  </div>

                  <div>

                    <span>
                      Família criada em
                    </span>

                    <strong>
                      {new Date(
                        familia.datacriacao
                      ).toLocaleDateString("pt-BR")}
                    </strong>

                  </div>

                </div>

              </section>


              {/* SAIR */}

              <section className="family-leave-card">

                <div>

                  <h3>
                    Sair da família
                  </h3>

                  <p>
                    Você poderá entrar em outra
                    família posteriormente.
                  </p>

                </div>

                <button
                  onClick={sairFamilia}
                >
                  <FaSignOutAlt />
                  Sair
                </button>

              </section>

            </>

          )}


          {/* ==============================
              SEM FAMÍLIA
          ============================== */}

          {!familia && !modo && (

            <section className="family-empty">

              <div className="family-empty-icon">
                <FaUsers />
              </div>

              <h2>
                Você ainda não possui uma família
              </h2>

              <p>
                Crie uma nova família ou entre
                em uma utilizando um código.
              </p>

              <div className="family-actions">

                <button
                  className="family-action-btn primary"
                  onClick={() => {
                    setModo("criar");
                    setMensagem("");
                    setErro("");
                  }}
                >
                  <FaPlus />
                  Criar família
                </button>

                <button
                  className="family-action-btn secondary"
                  onClick={() => {
                    setModo("entrar");
                    setMensagem("");
                    setErro("");
                  }}
                >
                  <FaSignInAlt />
                  Entrar em uma família
                </button>

              </div>

            </section>

          )}


          {/* ==============================
              CRIAR
          ============================== */}

          {!familia && modo === "criar" && (

            <section className="family-form-card">

              <div className="family-form-icon">
                <FaPlus />
              </div>

              <h2>
                Criar família
              </h2>

              <p>
                Escolha um nome para sua família.
              </p>

              <label>
                <FaUsers />
                Nome da família
              </label>

              <input
                type="text"
                value={nomefamilia}
                onChange={(e) =>
                  setNomefamilia(e.target.value)
                }
                placeholder="Digite o nome da família"
              />

              <div className="family-form-actions">

                <button
                  className="family-cancel-btn"
                  onClick={() => {
                    setModo(null);
                    setNomefamilia("");
                    setErro("");
                  }}
                >
                  Cancelar
                </button>

                <button
                  className="family-submit-btn"
                  onClick={criarFamilia}
                >
                  <FaPlus />
                  Criar família
                </button>

              </div>

            </section>

          )}


          {/* ==============================
              ENTRAR
          ============================== */}

          {!familia && modo === "entrar" && (

            <section className="family-form-card">

              <div className="family-form-icon">
                <FaKey />
              </div>

              <h2>
                Entrar em uma família
              </h2>

              <p>
                Digite o código recebido de
                outro membro da família.
              </p>

              <label>
                <FaKey />
                Código da família
              </label>

              <input
                type="text"
                value={codigofamilia}
                onChange={(e) =>
                  setCodigofamilia(
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="Ex: YRF3K6"
                maxLength={6}
              />

              <div className="family-form-actions">

                <button
                  className="family-cancel-btn"
                  onClick={() => {
                    setModo(null);
                    setCodigofamilia("");
                    setErro("");
                  }}
                >
                  Cancelar
                </button>

                <button
                  className="family-submit-btn"
                  onClick={entrarFamilia}
                >
                  <FaSignInAlt />
                  Entrar na família
                </button>

              </div>

            </section>

          )}

        </main>

      </div>

    </div>
  );
}

export default Family;