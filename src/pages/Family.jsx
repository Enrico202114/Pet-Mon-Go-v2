import { useState } from "react";
import { FaUsers, FaDog, FaPlus, FaSignOutAlt, FaCopy, FaArrowRight, FaEdit } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import FooterPanel from "../components/FooterPanel";
import "./Family.css";
import "./Dashboard.css";

function Family({ familias = [], familia, tutor, pets = [], onCreateFamily, onLeaveFamily, onUpdateFamily,
  onHome, onDashboard, onOpenProfile, onPets, onFamily, onSettings, onLogout }) {
  const [feedbackCodigo, setFeedbackCodigo] = useState("");
  const [editando, setEditando] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [privadaEditada, setPrivadaEditada] = useState(false);
  const [erro, setErro] = useState("");
  const lista = familias.length ? familias : familia ? [familia] : [];
  async function copiarCodigo(codigo) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard indisponível");
      await navigator.clipboard.writeText(codigo || "");
      setFeedbackCodigo("Código copiado!");
    } catch { setFeedbackCodigo("Não foi possível copiar o código."); }
    window.setTimeout(() => setFeedbackCodigo(""), 2500);
  }
  async function salvarEdicao(item) {
    setErro("");
    try { await onUpdateFamily(item, { nome: nomeEditado, privada: privadaEditada }); setEditando(null); }
    catch (e) { setErro(e.message || "Não foi possível atualizar a família."); }
  }
  return (
    <div className="dashboard">
      <Sidebar paginaAtiva="familia" onHome={onHome} onDashboard={onDashboard} onOpenProfile={onOpenProfile} onPets={onPets} onFamily={onFamily} onSettings={onSettings} onLogout={onLogout} />
      <main className="dashboard-main family-page">
        <section className="family-container">
          <header className="family-header"><div><h1>Minha Família</h1><p>Gerencie suas famílias e os cuidados compartilhados.</p></div>
            <button type="button" className="create-family-button" onClick={onCreateFamily}><FaPlus /> {lista.length ? "Adicionar família" : "Criar família"}</button>
          </header>
          {lista.length ? <div className="family-content">
            {lista.map((item) => <article className="family-main-card" key={item.codigo || item.nome}>
              <div className="family-card-top"><div className="family-avatar"><FaUsers /></div><div>
                <span className="family-label">Família</span><h2>{item.nome || "Minha família"}</h2>
                <p>Responsável: {item.responsavel || tutor?.nometutor || tutor?.nome || "Você"}</p>
              </div></div>
              {item.criador && editando === item.codigo ? <div className="family-edit-form">
                <label>Nome da família<input value={nomeEditado} onChange={(e) => setNomeEditado(e.target.value)} /></label>
                <label className="family-privacy-toggle"><input type="checkbox" checked={privadaEditada} onChange={(e) => setPrivadaEditada(e.target.checked)} /> Família privada (somente por convite)</label>
                <button type="button" onClick={() => salvarEdicao(item)}>Salvar</button><button type="button" onClick={() => setEditando(null)}>Cancelar</button>
              </div> : item.criador && <button type="button" className="family-edit-button" aria-label="Editar família" title="Editar família" onClick={() => { setEditando(item.codigo); setNomeEditado(item.nome || ""); setPrivadaEditada(Boolean(item.privada)); }}><FaEdit /></button>}
              <p className="family-visibility">{item.privada ? "Privada" : "Pública"}</p>
              <div className="family-code"><div><span>Código da família</span><strong>{item.codigo || "—"}</strong></div>
                <button type="button" className="copy-code" title="Copiar código" aria-label="Copiar código da família" onClick={() => copiarCodigo(item.codigo)}><FaCopy /></button>
              </div>
              {feedbackCodigo && <p className="family-copy-feedback" role="status">{feedbackCodigo}</p>}
              <div className="family-card-bottom"><span><FaDog /> {pets.length} {pets.length === 1 ? "animal cadastrado" : "animais cadastrados"}</span>
                <button type="button" className="leave-family-button" onClick={() => onLeaveFamily?.(item.codigo)}><FaSignOutAlt /> Remover família</button>
              </div>
            </article>)}
          </div> : <div className="create-family-card"><div className="create-family-icon"><FaUsers /></div>
            <h2>Nenhuma família cadastrada</h2><p>Crie uma família para organizar os cuidados em um só lugar.</p>
            <button type="button" className="create-family-button" onClick={onCreateFamily}><FaPlus /> Criar primeira família</button>
          </div>}
          {erro && <p role="alert" className="family-copy-feedback">{erro}</p>}
          {lista.length > 0 && <button type="button" className="family-add-another" onClick={onCreateFamily}><FaPlus /> Adicionar outra família <FaArrowRight /></button>}
        </section>
        <FooterPanel />
      </main>
    </div>
  );
}
export default Family;
