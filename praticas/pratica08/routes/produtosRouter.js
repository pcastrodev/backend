// routes/produtosRouter.js
const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * GET /produtos
 * Protegido por JWT
 * Retorna array JSON (vazio, por enquanto)
 */
router.get('/', verificarToken, (req, res) => {
  // Exemplo de resposta: lista vazia
  return res.status(200).json([]);
});

module.exports = router;
