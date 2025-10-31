// routes/usuariosRouter.js
const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * POST /usuarios/login
 * Body: { "usuario": "email@exemplo.com", "senha": "abcd1234" }
 * Retorna: { token: "..." }
 */
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Aqui você faria a validação real (banco, etc.).
  // Para a prática, qualquer usuario/senha passa:
  if (!usuario || !senha) {
    return res.status(400).json({ msg: 'Usuário e senha são obrigatórios' });
  }

  const token = gerarToken({ email: usuario });
  return res.status(200).json({ token });
});

/**
 * POST /usuarios/renovar
 * Header: Authorization: Bearer <token>
 * Retorna um novo token renovado com base no req.usuario.email
 */
router.post('/renovar', verificarToken, (req, res) => {
  const email = req?.usuario?.email;
  if (!email) {
    return res.status(400).json({ msg: 'Usuário não encontrado no token' });
  }
  const novoToken = gerarToken({ email });
  return res.status(200).json({ token: novoToken });
});

module.exports = router;
