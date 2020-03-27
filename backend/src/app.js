const express = require('express') //importando o módulo express
const routes = require("./routes");
const app = express();
const cors = require('cors');
const { errors } = require("celebrate");

app.use(cors({
    origin:'http://localhost:3000'
}))
//Utilizar o json para a utilização dos dados
app.use(express.json());

//O app utiliza as rotas
app.use(routes);

//evitar erros 500
app.use(errors());

module.exports = app;