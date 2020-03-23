const express = require('express') //importando o módulo express

const app = express();


app.get('/', (req, res) => {
    return res.json({nome: 'Eula', mensagem:"Hello World"});
})

app.listen(3333); //Ouvindo na porta 3333"