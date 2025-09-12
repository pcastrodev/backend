const express = require('express');
const app = express();

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const router = express.Router();

router.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

router.get('/tarefas/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return next(new Error('Tarefa não encontrada'));
  res.json(tarefa);
});

router.post('/tarefas', (req, res) => {
  const { nome, concluida = false } = req.body;
  if (typeof nome !== 'string' || !nome.trim()) {
    return res.status(400).json({ erro: 'Campo "nome" é obrigatório.' });
  }
  const novoId = tarefas.length ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;
  const novaTarefa = { id: novoId, nome: nome.trim(), concluida: Boolean(concluida) };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

router.put('/tarefas/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const idx = tarefas.findIndex(t => t.id === id);
  if (idx === -1) return next(new Error('Tarefa não encontrada'));

  const { nome, concluida } = req.body;

  if (nome !== undefined) {
    if (typeof nome !== 'string' || !nome.trim()) {
      return res.status(400).json({ erro: 'O "nome" deve ser uma string não vazia.' });
    }
    tarefas[idx].nome = nome.trim();
  }

  if (concluida !== undefined) {
    tarefas[idx].concluida = Boolean(concluida);
  }

  res.json(tarefas[idx]);
});

router.delete('/tarefas/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const idx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) return next(new Error('Tarefa não encontrada'));
    tarefas.splice(idx, 1);
    res.status(204).end();
});

app.use(router);

app.use((err, req, res, next) => {
  console.error('Erro capturado:', err.message);
  res.status(400).json({ erro: err.message });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

module.exports = app;
