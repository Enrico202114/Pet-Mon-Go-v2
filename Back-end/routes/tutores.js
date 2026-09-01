import express from "express";

import {
    listarTutores,
    buscarTutor,
    criarTutor,
    atualizarTutor,
    removerTutor
} from "../controllers/tutorController.js";

const router = express.Router();

router.get("/", listarTutores);
router.get("/:id", buscarTutor);
router.post("/", criarTutor);
router.put("/:id", atualizarTutor);
router.delete("/:id", removerTutor);

export default router;