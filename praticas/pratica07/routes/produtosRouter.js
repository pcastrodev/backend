const express = require('express');
const produtosController = require('../controllers/produtosController');

const router = express.Router();

router.post('/produtos', produtosController.criar);

router.get('/produtos', produtosController.listar);

router.get('/produtos/:id', produtosController.buscar, produtosController.exibir);

router.put('/produtos/:id', produtosController.buscar, produtosController.atualizar);

router.delete('/produtos/:id', produtosController.buscar, produtosController.remover);

module.exports = router;
