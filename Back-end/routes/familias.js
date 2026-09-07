import express from "express";

import {criarFamilia, buscarFamilia, entrarFamilia, sairFamilia} from "../controllers/familiaController.js";

const router = express.Router();
router.post("/", criarFamilia);
router.get("/:id", buscarFamilia);
router.post("/entrar", entrarFamilia);
router.delete("/:id/sair/:idtutor", sairFamilia);

export default router;