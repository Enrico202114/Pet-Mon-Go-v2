import { useRef, useState } from "react";
import { FaUser, FaDog, FaUsers, FaEnvelope, FaEdit, FaTrashAlt, FaArrowRight, FaPlus, FaTimes, FaSave } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import FooterPanel from "../components/FooterPanel";
import "./Profile.css";
import "./Dashboard.css";

function Profile({ tutor, pets = [], familias = [], onUpdateTutor, onSaveAvatar, onDeleteAccount,
  onHome, onDashboard, onOpenProfile, onMinhaFamilia, onCriarFamilia, onOpenPets, onOpenSettings, onLogout }) {
  const nomeTutor = tutor?.nometutor || tutor?.nome || "Tutor";
  const emailTutor = tutor?.emailtutor || tutor?.email || "E-mail não informado";
  const iniciais = nomeTutor.trim().split(/\s+/).slice(0, 2).map((parte) => parte[0]?.toLocaleUpperCase("pt-BR")).join("");
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(nomeTutor);
  const [email, setEmail] = useState(emailTutor === "E-mail não informado" ? "" : emailTutor);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const avatarInput = useRef(null);

  async function salvarAlteracoes(event) {
    event.preventDefault();
    setErro("");
    if (senha && senha !== confirmarSenha) return setErro("As senhas não coincidem.");
    if (senha && !senhaAtual) return setErro("Informe sua senha atual para trocar a senha.");
    const alteracoes = { nometutor: nome.trim(), emailtutor: email.trim() };
    if (senha) Object.assign(alteracoes, { senhaAtual, senhatutor: senha });
    setSalvando(true);
    try {
      await onUpdateTutor(alteracoes);
      setSenhaAtual(""); setSenha(""); setConfirmarSenha(""); setEditando(false);
    } catch (error) { setErro(error.message || "Não foi possível salvar seus dados."); }
    finally { setSalvando(false); }
  }

  function alterarFoto(event) {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) return setErro("Escolha um arquivo de imagem.");
    if (arquivo.size > 3 * 1024 * 1024) return setErro("A imagem deve ter no máximo 3 MB.");
    const leitor = new FileReader();
    leitor.onload = () => onSaveAvatar(leitor.result);
    leitor.readAsDataURL(arquivo);
  }

  async function excluirConta() {
    if (!window.confirm("Deseja excluir sua conta? Essa ação não pode ser desfeita.")) return;
    setErro("");
    try { await onDeleteAccount(); }
    catch (error) { setErro(error.message || "Não foi possível excluir a conta."); }
  }

  const nomePet = (value) => {
    const texto = String(value || "Pet").trim();
    return texto ? texto[0].toLocaleUpperCase("pt-BR") + texto.slice(1) : "Pet";
  };

  return (
    <div className="profile-page">
      <Sidebar paginaAtiva="perfil" onHome={onHome} onDashboard={onDashboard} onOpenProfile={onOpenProfile}
        onPets={onOpenPets} onFamily={onMinhaFamilia} onSettings={onOpenSettings} onLogout={onLogout} />
      <main className="profile-content">
        <header className="profile-heading"><div><h1>Meu Perfil</h1><p>Seus dados e atalhos para os cuidados da sua família.</p></div></header>
        <section className="profile-account-card">
          <button type="button" className="profile-edit-button" title={editando ? "Cancelar edição" : "Editar conta"}
            aria-label={editando ? "Cancelar edição" : "Editar conta"} onClick={() => { setEditando((value) => !value); setErro(""); }}>
            {editando ? <FaTimes /> : <FaEdit />}
          </button>
          <div className="profile-account-summary">
            <button type="button" className="profile-photo-button" aria-label="Alterar foto do perfil" onClick={() => avatarInput.current?.click()}>
              {tutor?.fotoPerfil ? <img src={tutor.fotoPerfil} alt={`Foto de ${nomeTutor}`} /> : <span>{iniciais || <FaUser />}</span>}
            </button>
            <input ref={avatarInput} className="profile-photo-input" type="file" accept="image/*" onChange={alterarFoto} />
            <div className="profile-account-identity">
              <span className="profile-label">Minha conta</span>
              <h2>{nomeTutor}</h2>
              <p><FaEnvelope aria-hidden="true" /> {emailTutor}</p>
            </div>
          </div>
          {editando && <form className="profile-edit-form" onSubmit={salvarAlteracoes}>
            <label>Nome completo<input value={nome} onChange={(event) => setNome(event.target.value)} required /></label>
            <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>Senha atual <span className="profile-optional">(necessária para trocar a senha)</span>
              <input type="password" value={senhaAtual} onChange={(event) => setSenhaAtual(event.target.value)} autoComplete="current-password" /></label>
            <label>Nova senha <span className="profile-optional">(opcional)</span>
              <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} autoComplete="new-password" /></label>
            {senha && <label>Confirmar nova senha<input type="password" value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)} autoComplete="new-password" required /></label>}
            {erro && <p className="profile-form-error" role="alert">{erro}</p>}
            <div className="profile-edit-actions"><button type="submit" disabled={salvando}><FaSave /> {salvando ? "Salvando…" : "Salvar alterações"}</button>
              <button type="button" className="profile-delete-button" onClick={excluirConta}><FaTrashAlt /> Excluir conta</button></div>
          </form>}
          {!editando && erro && <p className="profile-form-error" role="alert">{erro}</p>}
          {!editando && <button type="button" className="profile-delete-link" onClick={excluirConta}><FaTrashAlt /> Excluir conta</button>}
        </section>

        <div className="profile-shortcuts-grid">
          <section className="profile-shortcut-card">
            <header><div className="profile-shortcut-title"><FaDog /><h2>Meus animais</h2></div></header>
            {pets.length ? <div className="profile-mini-table-wrap"><table className="profile-mini-table">
              <thead><tr><th>Nome</th><th>Tipo</th><th>Raça</th></tr></thead>
              <tbody>{pets.slice(0, 3).map((pet) => <tr key={pet.id || pet.idpet || pet.nome}><td>{nomePet(pet.nome)}</td><td>{pet.especie || "—"}</td><td>{pet.raca || "—"}</td></tr>)}</tbody>
            </table><button type="button" className="profile-link-button" onClick={onOpenPets}>Ver todos os animais <FaArrowRight /></button></div>
              : <div className="profile-shortcut-empty"><p>Você ainda não cadastrou nenhum animal.</p><button type="button" className="profile-link-button" onClick={onOpenPets}><FaPlus /> Cadastrar animal</button></div>}
          </section>

          <section className="profile-shortcut-card">
            <header><div className="profile-shortcut-title"><FaUsers /><h2>Famílias</h2></div></header>
            {familias.length ? <div className="profile-family-list">{familias.slice(0, 3).map((item) => <div className="profile-family-row" key={item.codigo || item.nome}>
              <div><strong>{item.nome || "Minha família"}</strong><span>Código: {item.codigo || "—"}</span></div>
            </div>)}<button type="button" className="profile-link-button" onClick={onMinhaFamilia}>Ver famílias <FaArrowRight /></button></div>
              : <div className="profile-shortcut-empty"><p>Você ainda não cadastrou uma família.</p><button type="button" className="profile-link-button" onClick={onCriarFamilia}><FaPlus /> Cadastrar família</button></div>}
            {familias.length > 0 && <button type="button" className="profile-link-button profile-add-family" onClick={onCriarFamilia}><FaPlus /> Adicionar outra família</button>}
          </section>
        </div>
        <FooterPanel />
      </main>
    </div>
  );
}
export default Profile;
