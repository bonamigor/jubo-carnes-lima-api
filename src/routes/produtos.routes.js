const express = require('express');

const router = express.Router();
const produtoController = require('../controllers/produtos.controller');

router.get('/produtos', produtoController.listAllProdutos);

router.get('/produtos/:id', produtoController.listOneProduto);

router.post('/produtos', produtoController.createProduto);

router.put('/produtos', produtoController.updateProduto);

router.delete('/produtos/:id', produtoController.deleteProduto);

module.exports = router;
