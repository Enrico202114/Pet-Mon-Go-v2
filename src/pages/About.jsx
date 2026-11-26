import Sidebar from "../components/Sidebar";
import FooterPanel from "../components/FooterPanel";
import "./About.css";

export default function About({ onHome, onDashboard, onOpenProfile, onPets, onFamily, onSettings, onLogout }) {
  return <div className="dashboard"><Sidebar onHome={onHome} onDashboard={onDashboard} onOpenProfile={onOpenProfile} onPets={onPets} onFamily={onFamily} onSettings={onSettings} onLogout={onLogout}/>
    <main className="dashboard-main about-page"><section className="about-container">
      <h1>Sobre o Pet Mon Go</h1>
      <p className="about-lead">O Pet Mon Go é um sistema web criado para ajudar tutores e famílias a organizar os cuidados diários dos animais de estimação.</p>
      <section><h2>O projeto</h2><p>Famílias que convivem com pets podem ter dificuldade para organizar e dividir tarefas como alimentação, passeios, higiene, medicamentos e acompanhamento veterinário. A falta de uma rotina pode levar ao esquecimento de cuidados e concentrar responsabilidades em uma só pessoa.</p><p>O Pet Mon Go busca apoiar o registro das informações dos animais, a organização das rotinas e a divisão de responsabilidades entre os tutores, contribuindo para o bem-estar dos pets e a convivência familiar.</p></section>
      <section><h2>Objetivo</h2><p>Desenvolver um website para organizar rotinas de alimentação, passeios e higiene, acompanhar lembretes de vacinas, consultas e medicações, e facilitar a colaboração entre integrantes da família.</p></section>
      <section><h2>Criadores</h2><ul><li>Davi Brugnaro de Souza</li><li>Rafael Espírito Santo dos Reis Silva</li><li>Enrico de Oliveira Quirino</li></ul><p>Trabalho de conclusão do Curso Técnico em Desenvolvimento de Sistemas da Etec Dr. José Luiz Viana Coutinho, orientado pelo professor Mateus Boni Dias.</p></section>
      <section><h2>Data de criação</h2><p>O documento do projeto não informa uma data específica de criação do site.</p></section>
    </section><FooterPanel/></main>
  </div>;
}
