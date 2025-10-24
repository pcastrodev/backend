const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

exports.criar = async (req, res) => {
  try {
    const novoProduto = await Produto.create({
      nome: req.body?.nome,
      preco: req.body?.preco,
    });
    return res.status(201).json(novoProduto);
  } catch (err) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
};

exports.listar = async (req, res) => {
  const produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
};

exports.buscar = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  const produtoEncontrado = await Produto.findOne({ _id: id });

  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    return next();
  }
  return res.status(404).json({ msg: 'Produto não encontrado' });
};

exports.exibir = (req, res) => {
  return res.status(200).json(req.produto);
};

exports.atualizar = async (req, res) => {
  if (!req.body || req.body.nome === undefined || req.body.preco === undefined) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }

  try {
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id },
      { nome: req.body.nome, preco: req.body.preco },
      { runValidators: true, new: true }
    );
    return res.status(200).json(produtoAtualizado);
  } catch (err) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
};


exports.remover = async (req, res) => {
  await Produto.findOneAndDelete({ _id: req.params.id });
  return res.status(204).send();
};
