// app.js (CommonJS)
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouter');

dotenv.config();

const app = express();
app.use(express.json());

// Conexão com o MongoDB Atlas (como a prática pede)
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
);

// Usa o router de produtos
app.use('/', produtosRouter);

// Exporta a instância do app para o bin/www
module.exports = app;
