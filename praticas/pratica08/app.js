// app.js
require('dotenv').config(); // carrega .env no início

const express = require('express');
const logger = require('morgan');

const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas da API
app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

// Tratamento 404 simples
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});

// Tratamento de erro simples
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ msg: 'Erro interno' });
});

module.exports = app;
