const express = require('express');
const app = express();

app.use(express.json());

const tarefaRouter = require('./routes/tarefaRouter');
app.use('/tarefas', tarefaRouter);

module.exports = app;
