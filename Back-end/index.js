import "dotenv/config";
import express from "express";
import cors from "cors";

import tutorRoutes from "./routes/tutores.js";
import familiaRoutes from "./routes/familias.js";
import cuidadosRoutes from "./routes/cuidados.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tutores", tutorRoutes);
app.use("/familias", familiaRoutes);
app.use("/api", cuidadosRoutes);

app.get("/", function (req, res) {
    res.json({
        message: "API Pet Mon Go funcionando!"
    });
});

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
});
