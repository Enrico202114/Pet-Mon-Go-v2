const tutores = require('../models/tutor');

function listarTutores(req, res) {
    res.json(tutores);
}

function buscarTutor(req, res) {
    const id = Number(req.params.id);
    const tutor = tutores.find(function (tutor) {
        return tutor.id === id;
    });

    if (!tutor) {
        return res.status(404).json({
            message: 'Tutor não encontrado'
        });
    }
    res.json(tutor);
}

function criarTutor(req, res) {
    const novoTutor = {
        id: tutores.length + 1,
        nome: req.body.nome
    };

    tutores.push(novoTutor);
    res.status(201).json(novoTutor);
}

function atualizarTutor(req, res) {
    const id = Number(req.params.id);
    const tutor = tutores.find(function (tutor) {
        return tutor.id === id;
    });

    if (!tutor) {
        return res.status(404).json({
            message: 'Tutor não encontrado'
        });
    }

    tutor.nome = req.body.nome;
    res.json(tutor);
}

function removerTutor(req, res) {
    const id = Number(req.params.id);
    const indice = tutores.findIndex(function (tutor) {
        return tutor.id === id;
    });

    if (indice === -1) {
        return res.status(404).json({
            message: 'Tutor não encontrado'
        });
    }

    const tutorRemovido = tutores.splice(indice, 1);

    res.json({
        message: 'Tutor removido com sucesso',
        tutor: tutorRemovido[0]
    });
}

module.exports = {
    listarTutores,
    buscarTutor,
    criarTutor,
    atualizarTutor,
    removerTutor
};