
import { useState } from "react";
import { FaDog, FaArrowLeft, FaSave } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import FooterPanel from "../components/FooterPanel";
import "./Dashboard.css";
import "./CadastroPet.css";

function CadastroPet({
  onBack,
  onSave,
  petInicial,
  onHome,
  onOpenProfile,
  onPets,
  onFamily,
  onSettings,
  onLogout,
}) {
  const [nome, setNome] = useState(petInicial?.nome || "");
  const [especie, setEspecie] = useState(petInicial?.especie || "Cachorro");
  const [raca, setRaca] = useState(petInicial?.raca || "");
  const [sexo, setSexo] = useState(petInicial?.sexo || "");
  const [idade, setIdade] = useState(petInicial?.idade || "");
  const [peso, setPeso] = useState(petInicial?.peso || "");

  function handleSubmit(event) {
    event.preventDefault();

    if (!nome.trim()) {
      alert("Digite o nome do seu pet.");
      return;
    }

    const nomePet = nome.trim();
    const novoPet = {
      id: petInicial?.id || Date.now(),
      nome: nomePet.charAt(0).toLocaleUpperCase("pt-BR") + nomePet.slice(1),
      especie,
      raca: raca.trim(),
      sexo,
      idade,
      peso
    };

    onSave(novoPet);
  }

  return (
    <div className="dashboard">
      <Sidebar
        paginaAtiva="pets"
        onHome={onHome}
        onOpenProfile={onOpenProfile}
        onPets={onPets}
        onFamily={onFamily}
        onSettings={onSettings}
        onLogout={onLogout}
      />

      <main className="dashboard-main cadastro-pet-page">
        <section className="cadastro-pet-container">
        <button
          type="button"
          className="cadastro-pet-back"
          onClick={onBack}
        >
          <FaArrowLeft /> Voltar para meus pets
        </button>

        <header className="cadastro-pet-header">
          <div className="cadastro-pet-icon">
            <FaDog />
          </div>

          <h1>{petInicial ? "Editar pet" : "Cadastrar pet"}</h1>
          <p>Preencha as informações do seu companheiro.</p>
        </header>

        <form onSubmit={handleSubmit} className="cadastro-pet-form">
          <label htmlFor="nomePet">Nome do pet *</label>
          <input
            id="nomePet"
            value={nome}
            onChange={(event) => {
              const valor = event.target.value;
              setNome(valor.replace(/^(\s*)(\S)/u, (_match, espacos, primeiraLetra) => espacos + primeiraLetra.toLocaleUpperCase("pt-BR")));
            }}
            placeholder="Ex.: Thor"
            required
          />

          <label htmlFor="especiePet">Espécie *</label>
          <select
            id="especiePet"
            value={especie}
            onChange={(event) => setEspecie(event.target.value)}
          >
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Ave">Ave</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="racaPet">Raça</label>
          <input
            id="racaPet"
            value={raca}
            onChange={(event) => setRaca(event.target.value)}
            placeholder="Ex.: SRD"
          />

          <label htmlFor="sexoPet">Sexo</label>
          <select
            id="sexoPet"
            value={sexo}
            onChange={(event) => setSexo(event.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <label htmlFor="idadePet">Idade</label>
          <input
            id="idadePet"
            value={idade}
            onChange={(event) => setIdade(event.target.value)}
            placeholder="Ex.: 2 anos"
          />

          <label htmlFor="pesoPet">Peso</label>
          <input
            id="pesoPet"
            value={peso}
            onChange={(event) => setPeso(event.target.value)}
            placeholder="Ex.: 5 kg"
          />

          <button type="submit" className="cadastro-pet-save">
            <FaSave /> Salvar pet
          </button>
        </form>
        </section>
        <FooterPanel />
      </main>
    </div>
  );
}

export default CadastroPet;
