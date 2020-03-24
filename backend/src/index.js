const express = require('express') //importando o módulo express
const routes = require("./routes");
const app = express();
const cors = require('cors');

app.use(cors({
    origin:'http://localhost:3000'
}))
//Utilizar o json para a utilização dos dados
app.use(express.json());

//O app utiliza as rotas
app.use(routes);

app.listen(3333); //Ouvindo na porta 3333"