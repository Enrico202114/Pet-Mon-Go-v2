import express from "express";

import tutorRoutes from "./routes/tutores.js";

const app = express();

app.use(express.json());

app.use("/tutores", tutorRoutes);

app.get("/", function (req, res) {
    res.json({
        message: "API Pet Mon Go funcionando!"
    });
});

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
});