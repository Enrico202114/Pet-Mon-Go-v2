import { prisma } from "../lib/prisma.js";

async function criarFamilia(req, res) {
    try {
        const { nomefamilia, idtutor } = req.body;

        if (!nomefamilia || !idtutor) {
            return res.status(400).json({message: "Nome da família e tutor são obrigatórios"});
        }

        const tutor = await prisma.tutor.findUnique({where: {idtutor: Number(idtutor)}});

        if (!tutor) {
            return res.status(404).json({message: "Tutor não encontrado"});
        }

        if (tutor.idfamilia) {
            return res.status(400).json({message: "Este tutor já pertence a uma família"});
        }

        const codigo = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        const familia = await prisma.familia.create({
            data: {
                nomefamilia,
                codigofamilia: codigo,
                membros: {
                    connect: {
                        idtutor: tutor.idtutor
                    }
                }
            },
            include: {
                membros: {
                    select: {
                        idtutor: true,
                        nometutor: true,
                        emailtutor: true
                    }
                }
            }
        });

        res.status(201).json({
            message: "Família criada com sucesso",
            familia
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            message: "Erro ao criar família"
        });
    }
}


async function buscarFamilia(req, res) {
    try {
        const id = Number(req.params.id);

        const familia = await prisma.familia.findUnique({
            where: {
                idfamilia: id
            },
            include: {
                membros: {
                    select: {
                        idtutor: true,
                        nometutor: true,
                        emailtutor: true
                    }
                }
            }
        });

        if (!familia) {
            return res.status(404).json({message: "Família não encontrada"});
        }

        res.json(familia);

    } catch (erro) {console.error(erro);

        res.status(500).json({message: "Erro ao buscar família"});
    }
}


async function entrarFamilia(req, res) {
    try {
        const { codigofamilia, idtutor } = req.body;

        if (!codigofamilia || !idtutor) {
            return res.status(400).json({message: "Código da família e tutor são obrigatórios"});
        }

        const tutor = await prisma.tutor.findUnique({where: {idtutor: Number(idtutor)}});

        if (!tutor) {
            return res.status(404).json({message: "Tutor não encontrado"});
        }

        if (tutor.idfamilia) {
            return res.status(400).json({message: "Você já pertence a uma família"});
        }

        const familia = await prisma.familia.findUnique({where: {codigofamilia}});

        if (!familia) {
            return res.status(404).json({message: "Código de família inválido"});
        }

        const tutorAtualizado = await prisma.tutor.update({
            where: {idtutor: tutor.idtutor},
            data: {idfamilia: familia.idfamilia},
            select: {idtutor: true, nometutor: true, emailtutor: true, idfamilia: true}
        });

        res.json({message: "Você entrou na família com sucesso", tutor: tutorAtualizado, familia});

    } catch (erro) {console.error(erro);

        res.status(500).json({message: "Erro ao entrar na família"});
    }
}


async function sairFamilia(req, res) {
    try {
        const idfamilia = Number(req.params.id);
        const idtutor = Number(req.params.idtutor);

        const tutor = await prisma.tutor.findUnique({
            where: {idtutor}
        });

        if (!tutor) {
            return res.status(404).json({message: "Tutor não encontrado"});
        }

        if (tutor.idfamilia !== idfamilia) {
            return res.status(400).json({message: "Tutor não pertence a esta família"});
        }

        await prisma.tutor.update({
            where: {idtutor}, data: {idfamilia: null}
        });

        res.json({message: "Você saiu da família com sucesso"});

    } catch (erro) {console.error(erro);

        res.status(500).json({message: "Erro ao sair da família"});
    }
}


export {
    criarFamilia,
    buscarFamilia,
    entrarFamilia,
    sairFamilia
};