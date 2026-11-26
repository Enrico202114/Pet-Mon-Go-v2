import express from "express";
import {criarFamilia, listarFamilias, buscarFamilia, atualizarFamilia, removerFamilia, entrarFamilia, sairFamilia} from "../controllers/familiaController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);
router.post("/", criarFamilia);
router.get("/", listarFamilias);
router.put("/:id", atualizarFamilia);
router.delete("/:id", removerFamilia);
router.get("/:id", buscarFamilia);
router.post("/entrar", entrarFamilia);
router.delete("/:id/sair/:idtutor", sairFamilia);

export default router;
