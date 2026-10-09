
import { useState } from "react";
import { FaPaw, FaArrowLeft, FaSave } from "react-icons/fa";
import "./CadastroPet.css";

function CadastroPet({ onBack, onSave }) {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("Cachorro");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!nome.trim()) {
      alert("Digite o nome do seu pet.");
      return;
    }

    const novoPet = {
      id: Date.now(),
      nome: nome.trim(),
      especie,
      raca: raca.trim(),
      sexo,
      idade,
      peso
    };

    onSave(novoPet);
  }

  return (
    <main className="cadastro-pet-page">
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
            <FaPaw />
          </div>

          <h1>Cadastrar pet</h1>
          <p>Preencha as informações do seu companheiro.</p>
        </header>

        <form onSubmit={handleSubmit} className="cadastro-pet-form">
          <label htmlFor="nomePet">Nome do pet *</label>
          <input
            id="nomePet"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
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
    </main>
  );
}

export default CadastroPet;
