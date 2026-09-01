import { prisma } from "../lib/prisma.js";

async function listarTutores(req, res) {
    try {
        const tutores = await prisma.tutor.findMany();

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
            where: {
                idtutor: id
            }
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

        const novoTutor = await prisma.tutor.create({
            data: {
                nometutor,
                emailtutor,
                senhatutor
            }
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

        const { nometutor, emailtutor, senhatutor } = req.body;

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

        const tutorAtualizado = await prisma.tutor.update({
            where: {
                idtutor: id
            },
            data: {
                nometutor,
                emailtutor,
                senhatutor
            }
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
            tutor: tutorRemovido
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao remover tutor"
        });
    }
}

export {
    listarTutores,
    buscarTutor,
    criarTutor,
    atualizarTutor,
    removerTutor
};