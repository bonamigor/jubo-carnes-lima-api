const express = require('express');

const router = express.Router();
const estanteProdutoController = require('../controllers/estante-produto.controller');

// ==> GET http://localhost:3000/api/estantes/id/produtos
router.get('/estantes/:id/produtos', estanteProdutoController.listAllProdutosNaEstante);

// ==> POST http://localhost:3000/api/estantes/id/produtos/id
router.post('/estantes/:idEstante/produtos/:idProduto', estanteProdutoController.addProdutoNaEstante);

// ==> GET http://localhost:3000/api/estantes/id/produtos/id
router.delete('/estantes/:idEstante/produtos/:idProduto', estanteProdutoController.deleteProdutoDaEstante);

module.exports = router;
