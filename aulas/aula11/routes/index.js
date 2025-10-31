const express = require('express');
const { verificarToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/', verificarToken, function(req, res, next) {
  res.json("API está ON!");
});

module.exports = router;
