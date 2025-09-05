// 1. Importar o framework
const express = require('express');

// 2. Criar uma instância da aplicação
const app = express();

// Criar um middleware 
app.get('/', (req, res) => {
    res.send('Olá!');
    });

// 3. Iniciar a aplicação em uma porta
app.listen(3000, () => {
  console.log('App está on!');
});