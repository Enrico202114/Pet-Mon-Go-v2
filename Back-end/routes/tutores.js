import express from "express";
import {listarTutores, buscarTutor, criarTutor, atualizarTutor, removerTutor, loginTutor} from "../controllers/tutorController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.get("/", listarTutores);
router.post("/login", loginTutor);
router.post("/", criarTutor);
router.use(requireAuth);
router.get("/:id", buscarTutor);
router.put("/:id", atualizarTutor);
router.delete("/:id", removerTutor);

export default router;
