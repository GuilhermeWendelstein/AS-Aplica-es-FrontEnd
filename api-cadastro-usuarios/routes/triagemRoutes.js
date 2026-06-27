const express = require('express');
const router = express.Router();

const triagemController = require('../controllers/triagemController');
// define rota post na raiz
router.post('/', triagemController.criarTriagem);

module.exports = router;