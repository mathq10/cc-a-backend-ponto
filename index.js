const express = require('express');
const app = express();

const sequelize = require('./config/db');

sequelize.authenticate()
    .then(() => {
        console.log("Conectei no banco");
    })
    .catch(error => {
        console.log(`Deu erro ao conectar no bd ${error}`);
    });





// app.METODO('rota/caminho', (req, res) => {})

app.get('/users', (req, res) => {
    res.send("Nessa rota vou retornar os usuários");
});

app.post('/users', (req, res) => {
    res.send("Rota users usando post");
});

app.get('/user/:id', (req, res) => {
    res.send(`o parâmetro é ${req.params.id}`)
});

app.post('/user/:id1-:id2', (req, res) => {
    res.send(req.params);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor web ouvindo na porta ${PORT}`);
});