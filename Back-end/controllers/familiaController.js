import { randomBytes } from "node:crypto";
import { prisma } from "../lib/prisma.js";

const select = { idfamilia: true, nomefamilia: true, codigofamilia: true, privada: true, datacriacao: true, membros: { include: { tutor: { select: { idtutor: true, nometutor: true, emailtutor: true } } } } };
export async function criarFamilia(req, res) {
  try {
    const { nomefamilia, idtutor, privada = false } = req.body;
    if (!nomefamilia?.trim() || !Number(idtutor)) return res.status(400).json({ message: "Nome da família e tutor são obrigatórios" });
    const tutor = await prisma.tutor.findUnique({ where: { idtutor: Number(idtutor) } });
    if (!tutor) return res.status(404).json({ message: "Tutor não encontrado" });
    const familia = await prisma.familia.create({ data: { nomefamilia: nomefamilia.trim(), privada: Boolean(privada), codigofamilia: randomBytes(5).toString("hex").toUpperCase(), membros: { create: { idtutor: tutor.idtutor, papel: "criador" } } }, select });
    res.status(201).json(familia);
  } catch (e) { console.error(e); res.status(500).json({ message: "Erro ao criar família" }); }
}
export async function listarFamilias(req, res) {
  try { res.json(await prisma.familia.findMany({ where: req.query.idtutor ? { membros: { some: { idtutor: Number(req.query.idtutor) } } } : { privada: false }, select })); }
  catch (e) { console.error(e); res.status(500).json({ message: "Erro ao listar famílias" }); }
}
export async function buscarFamilia(req, res) {
  try { const familia = await prisma.familia.findUnique({ where: { idfamilia: Number(req.params.id) }, select }); if (!familia) return res.status(404).json({ message: "Família não encontrada" }); res.json(familia); }
  catch (e) { console.error(e); res.status(500).json({ message: "Erro ao buscar família" }); }
}
export async function atualizarFamilia(req, res) {
  try { const idfamilia = Number(req.params.id); const idtutor = Number(req.body.idtutor); const criador = await prisma.familiaMembro.findUnique({ where: { idfamilia_idtutor: { idfamilia, idtutor } } }); if (criador?.papel !== "criador") return res.status(403).json({ message: "Somente quem criou a família pode alterar nome e privacidade" }); const data = {}; if (typeof req.body.nomefamilia === "string" && req.body.nomefamilia.trim()) data.nomefamilia = req.body.nomefamilia.trim(); if (typeof req.body.privada === "boolean") data.privada = req.body.privada; res.json(await prisma.familia.update({ where: { idfamilia }, data, select })); }
  catch (e) { console.error(e); res.status(500).json({ message: "Erro ao atualizar família" }); }
}
export async function removerFamilia(req, res) {
  try { const idfamilia = Number(req.params.id); const idtutor = Number(req.body.idtutor || req.query.idtutor); const criador = await prisma.familiaMembro.findUnique({ where: { idfamilia_idtutor: { idfamilia, idtutor } } }); if (criador?.papel !== "criador") return res.status(403).json({ message: "Somente quem criou a família pode removê-la" }); await prisma.familia.delete({ where: { idfamilia } }); res.status(204).end(); }
  catch (e) { console.error(e); res.status(500).json({ message: "Erro ao remover família" }); }
}
export async function entrarFamilia(req, res) {
  try { const familia = await prisma.familia.findUnique({ where: { codigofamilia: String(req.body.codigofamilia || "").toUpperCase() } }); if (!familia || familia.privada) return res.status(404).json({ message: "Família não encontrada ou privada" }); const membro = await prisma.familiaMembro.create({ data: { idfamilia: familia.idfamilia, idtutor: Number(req.body.idtutor) } }); res.status(201).json(membro); }
  catch (e) { console.error(e); res.status(400).json({ message: "Não foi possível entrar na família" }); }
}
export async function sairFamilia(req, res) {
  try { const idfamilia = Number(req.params.id); const idtutor = Number(req.params.idtutor); const membro = await prisma.familiaMembro.findUnique({ where: { idfamilia_idtutor: { idfamilia, idtutor } } }); if (!membro || membro.papel === "criador") return res.status(403).json({ message: "Criador não pode sair sem excluir a família" }); await prisma.familiaMembro.delete({ where: { idfamilia_idtutor: { idfamilia, idtutor } } }); res.status(204).end(); }
  catch (e) { console.error(e); res.status(500).json({ message: "Erro ao sair da família" }); }
}
