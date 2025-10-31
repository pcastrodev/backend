// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

/**
 * Extrai token do header Authorization.
 * Aceita "Bearer <token>" ou o token cru.
 */
function extrairToken(authorizationHeader) {
  if (!authorizationHeader) return null;
  const val = authorizationHeader.trim();
  if (val.toLowerCase().startsWith('bearer ')) {
    return val.slice(7).trim();
  }
  return val;
}

function verificarToken(req, res, next) {
  try {
    const header = req.headers['authorization'];
    const token = extrairToken(header);

    if (!token) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // payload decodificado fica acessível
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

function gerarToken(payload) {
  try {
    const expiresIn = 120; // segundos
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = {
  verificarToken,
  gerarToken,
};
