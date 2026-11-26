import express from "express";
import { handlers } from "../controllers/cuidadosController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);
for (const resource of ["pets", "vacinas", "medicacoes", "passeios", "alimentacoes"]) {
  const h = handlers(resource);
  const path = `/${resource}`;
  router.get(path, h.list); router.post(path, h.create);
  router.get(`${path}/:id`, h.get); router.put(`${path}/:id`, h.update); router.delete(`${path}/:id`, h.remove);
}
export default router;
