const express = require('express');
const router = express.Router();

const tutorController = require('../controllers/tutorController');

router.get('/', tutorController.listarTutores);
router.get('/:id', tutorController.buscarTutor);
router.post('/', tutorController.criarTutor);
router.put('/:id', tutorController.atualizarTutor);
router.delete('/:id', tutorController.removerTutor);

module.exports = router;