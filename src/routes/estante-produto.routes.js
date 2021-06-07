const express = require('express');

const router = express.Router();
const estanteProdutoController = require('../controllers/estante-produto.controller');

router.get('/estantes/:id/produtos', estanteProdutoController.listAllProdutosNaEstante);

router.post('/estantes/:idEstante/produtos/:idProduto', estanteProdutoController.addProdutoNaEstante);

router.delete('/estantes/:idEstante/produtos/:idProduto', estanteProdutoController.deleteProdutoDaEstante);

module.exports = router;
