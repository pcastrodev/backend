const express = require('express');
const router = express.Router();

// Rota inicial só para testar
router.get('/', (req, res) => {
  res.json({ message: 'API prática09 funcionando! 🚀' });
});

module.exports = router;
