const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  const resultado = tarefaModel.listar();
  return res.status(200).json(resultado);
}

function buscarPeloId(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.buscarPeloId(String(tarefaId));
  if (resultado) return res.status(200).json(resultado);
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

function criar(req, res) {
  const { nome, concluida } = req.body || {};
  const resultado = tarefaModel.criar({ nome, concluida: !!concluida });
  return res.status(201).json(resultado);
}

function atualizar(req, res) {
  const { tarefaId } = req.params;
  const { nome, concluida } = req.body || {};
  const resultado = tarefaModel.atualizar({ id: String(tarefaId), nome, concluida: !!concluida });
  if (resultado) return res.status(200).json(resultado);
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

function remover(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.remover(String(tarefaId));
  if (resultado) return res.status(204).send();
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };
