const express = require('express');

const app = express();

app.use(express.json());

const tutorRoutes = require('./routes/tutores');

app.use('/tutores', tutorRoutes);

app.get('/', function (req, res) {
    res.json({ message: 'API Pet Mon Go funcionando!' });
});

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
});