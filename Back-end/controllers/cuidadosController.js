import { prisma } from "../lib/prisma.js";

const resources = {
  pets: { model: "pet", id: "idpet", fields: ["idtutor", "nomepet", "especiespet", "racapet", "sexopet", "datanascpet", "pesopet"] },
  vacinas: { model: "vacina", id: "idvacina", fields: ["idpet", "nomevacina", "lotevacina", "dataaplicacao", "proximadose", "observacao"] },
  medicacoes: { model: "medicacao", id: "idmedicacao", fields: ["idpet", "nomemedicacao", "dosagemmedicamento", "frequenciamedicamento", "tipofrequencia", "datainicio", "datafim", "observacao"] },
  passeios: { model: "passeio", id: "idpasseio", fields: ["idpet", "datahora", "duracaoMinutos", "local", "observacao"] },
  alimentacoes: { model: "alimentacao", id: "idalimentacao", fields: ["idpet", "tipoalimentacao", "quantidadealimentacao", "unidadequantidade", "observacao"] },
};

const clean = (config, input) => Object.fromEntries(config.fields.filter((key) => input[key] !== undefined).map((key) => [key, ["idpet", "idtutor", "frequenciamedicamento", "duracaoMinutos"].includes(key) || key === "quantidadealimentacao" ? Number(input[key]) : ["datanascpet", "dataaplicacao", "proximadose", "datainicio", "datafim", "datahora"].includes(key) && input[key] ? new Date(input[key]) : input[key]]));
const error = (res, err) => { console.error(err); return res.status(500).json({ message: "Erro ao acessar os dados" }); };

export function handlers(resource) {
  const config = resources[resource];
  const model = prisma[config.model];
  return {
    list: async (req, res) => { try { const where = req.query.idtutor && resource === "pets" ? { idtutor: Number(req.query.idtutor) } : req.query.idpet ? { idpet: Number(req.query.idpet) } : {}; res.json(await model.findMany({ where, orderBy: { [config.id]: "desc" } })); } catch (e) { error(res, e); } },
    get: async (req, res) => { try { const item = await model.findUnique({ where: { [config.id]: Number(req.params.id) } }); if (!item) return res.status(404).json({ message: "Registro não encontrado" }); res.json(item); } catch (e) { error(res, e); } },
    create: async (req, res) => { try { const data = clean(config, req.body); if (resource === "pets" && (!data.idtutor || !data.nomepet || !data.especiespet)) return res.status(400).json({ message: "Tutor, nome e espécie são obrigatórios" }); if (resource !== "pets" && !data.idpet) return res.status(400).json({ message: "Pet é obrigatório" }); res.status(201).json(await model.create({ data })); } catch (e) { error(res, e); } },
    update: async (req, res) => { try { const id = Number(req.params.id); const current = await model.findUnique({ where: { [config.id]: id } }); if (!current) return res.status(404).json({ message: "Registro não encontrado" }); res.json(await model.update({ where: { [config.id]: id }, data: clean(config, req.body) })); } catch (e) { error(res, e); } },
    remove: async (req, res) => { try { const id = Number(req.params.id); await model.delete({ where: { [config.id]: id } }); res.status(204).end(); } catch (e) { error(res, e); } },
  };
}
