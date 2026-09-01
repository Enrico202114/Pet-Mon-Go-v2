import { prisma } from "./lib/prisma.js";

async function testar() {
    try {
        const quantidade = await prisma.tutor.count();

        console.log("Conexão com o banco funcionando!");
        console.log("Quantidade de tutores:", quantidade);
    } catch (erro) {
        console.error("Erro ao conectar com o banco:");
        console.error(erro);
    } finally {
        await prisma.$disconnect();
    }
}

testar();