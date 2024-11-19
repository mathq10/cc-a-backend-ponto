const express = require('express');
const app = express();
const cors = require('cors');

const sequelize = require('./config/db');
const Usuario = require('./models/Usuario');
const Ponto = require('./models/Ponto');


app.use(express.json());
app.use(cors());

sequelize.sync({ alter: true })
    .then(() => {
        console.log("SUCESSO!");
    })
    .catch(error => {
        console.log(`Erro ao sincronizar as tabelas - ${error}`);
    });


//Usuario.create({ nome: "Airton", email: "airton@airton.com", login: "airton", senha: "amomeusalunos", permissao: "USER"});
//Usuario.create({ nome: "Airton Junior", email: "airtonjunior@airton.com", login: "airtonjunior", senha: "amomeusalunos", permissao: "USER"});



// Rota que recupera todos os usuários da aplicação
app.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.send(usuarios);
});


// Rota que recupera um usuário específico do banco de dados RELACIONAL
app.get('/usuario/:id_usuario', async (req, res) => {
    
    const usuario = await Usuario.findAll({
        where: {
          id_usuario: req.params.id_usuario, 
        },
    });

    res.send(usuario);
});


// Rota que cria um usuário
app.post('/usuario', async (req, res) => {

    const usuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        login: req.body.login,
        permissao: req.body.permissao
    });


    res.send(usuario);
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor web ouvindo na porta ${PORT}`);
});
