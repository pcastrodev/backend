const jwt = require("jsonwebtoken");

function gerarToken(payload) {
  try {
    const expiresIn = "5m";
    const token = jwt.sign(payload, process.env.JWT_SEGREDO, { expiresIn });
    return token;
  } catch (err) {
    throw Error("Erro ao gerar um token");
  }
}

function verificarToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const payload = jwt.verify(authorization, process.env.JWT_SEGREDO);
    req.payload = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalido" });
  }
}

module.exports = { gerarToken, verificarToken };
