import express from "express";

import {
    listarTutores,
    buscarTutor,
    criarTutor,
    atualizarTutor,
    removerTutor,
    loginTutor
} from "../controllers/tutorController.js";

const router = express.Router();
router.get("/", listarTutores);
router.post("/login", loginTutor);
router.get("/:id", buscarTutor);
router.post("/", criarTutor);
router.put("/:id", atualizarTutor);
router.delete("/:id", removerTutor);

export default router;