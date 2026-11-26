import { prisma } from "../lib/prisma.js";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { createToken } from "../middleware/auth.js";

const HASH_PREFIX = "scrypt:";
function hashPassword(password) {
    const salt = randomBytes(16).toString("hex");
    const digest = scryptSync(password, salt, 64).toString("hex");
    return `${HASH_PREFIX}${salt}:${digest}`;
}
function verifyPassword(password, stored) {
    if (typeof password !== "string" || typeof stored !== "string") return false;
    if (!stored.startsWith(HASH_PREFIX)) return stored === password;
    const [, salt, digest] = stored.split(":");
    if (!salt || !digest) return false;
    const candidate = scryptSync(password, salt, 64);
    const expected = Buffer.from(digest, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

async function listarTutores(req, res) {
    try {
        const tutores = await prisma.tutor.findMany({
            select: { idtutor: true, nometutor: true, emailtutor: true }
        });

        res.json(tutores);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao listar tutores"
        });
    }
}

async function buscarTutor(req, res) {
    try {
        const id = Number(req.params.id);

        const tutor = await prisma.tutor.findUnique({
            where: { idtutor: id },
            select: { idtutor: true, nometutor: true, emailtutor: true }
        });

        if (!tutor) {
            return res.status(404).json({
                message: "Tutor não encontrado"
            });
        }

        res.json(tutor);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao buscar tutor"
        });
    }
}

async function criarTutor(req, res) {
    try {
        const { nometutor, emailtutor, senhatutor } = req.body;
        if (!nometutor?.trim() || !emailtutor?.trim() || !senhatutor) {
            return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios" });
        }

        const novoTutor = await prisma.tutor.create({
            data: {
                nometutor: nometutor.trim(),
                emailtutor: emailtutor.trim(),
                senhatutor: hashPassword(senhatutor)
            },
            select: { idtutor: true, nometutor: true, emailtutor: true }
        });

        res.status(201).json(novoTutor);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao criar tutor"
        });
    }
}

async function atualizarTutor(req, res) {
    try {
        const id = Number(req.params.id);

        const { nometutor, emailtutor, senhatutor, senhaAtual } = req.body;

        const tutor = await prisma.tutor.findUnique({
            where: {
                idtutor: id
            }
        });

        if (!tutor) {
            return res.status(404).json({
                message: "Tutor não encontrado"
            });
        }

        if (senhatutor && !verifyPassword(senhaAtual, tutor.senhatutor)) {
            return res.status(401).json({ message: "A senha atual está incorreta" });
        }

        const data = {};
        if (nometutor !== undefined) data.nometutor = nometutor.trim();
        if (emailtutor !== undefined) data.emailtutor = emailtutor.trim();
        if (senhatutor) data.senhatutor = hashPassword(senhatutor);

        const tutorAtualizado = await prisma.tutor.update({
            where: { idtutor: id },
            data,
            select: { idtutor: true, nometutor: true, emailtutor: true }
        });

        res.json(tutorAtualizado);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao atualizar tutor"
        });
    }
}

async function removerTutor(req, res) {
    try {
        const id = Number(req.params.id);

        const tutor = await prisma.tutor.findUnique({
            where: {
                idtutor: id
            }
        });

        if (!tutor) {
            return res.status(404).json({
                message: "Tutor não encontrado"
            });
        }

        const tutorRemovido = await prisma.tutor.delete({
            where: {
                idtutor: id
            }
        });

        res.json({
            message: "Tutor removido com sucesso",
            tutor: {
                idtutor: tutorRemovido.idtutor,
                nometutor: tutorRemovido.nometutor,
                emailtutor: tutorRemovido.emailtutor
            }
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao remover tutor"
        });
    }
}

async function loginTutor(req, res) {
    try {
        const { emailtutor, senhatutor } = req.body;

        const tutor = await prisma.tutor.findUnique({
            where: {
                emailtutor
            }
        });

        if (!tutor) {
            return res.status(401).json({
                message: "E-mail ou senha incorretos"
            });
        }

        if (!verifyPassword(senhatutor, tutor.senhatutor)) {
            return res.status(401).json({
                message: "E-mail ou senha incorretos"
            });
        }

        if (!tutor.senhatutor.startsWith(HASH_PREFIX)) {
            await prisma.tutor.update({
                where: { idtutor: tutor.idtutor },
                data: { senhatutor: hashPassword(senhatutor) }
            });
        }

        res.json({
            message: "Login realizado com sucesso",
            token: createToken(tutor.idtutor),
            tutor: {
                idtutor: tutor.idtutor,
                nometutor: tutor.nometutor,
                emailtutor: tutor.emailtutor
            }
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao realizar login"
        });
    }
}

export {
    listarTutores,
    buscarTutor,
    criarTutor,
    atualizarTutor,
    removerTutor,
    loginTutor
};
