const express = require('express');

const router = express.Router();
const precoQuantidadeController = require('../controllers/preco-quantidade.controller');

// ==> GET http://localhost:3000/api/estantes/id/produtos/preco-quantidade
router.get('/estantes/:id/produtos/preco-quantidade', precoQuantidadeController.listarDetalhado);

// ==> POST http://localhost:3000/api/estantes/:idEstante/produtos/:idProduto/preco-quantidade
router.post('/estantes/:idEstante/produtos/:idProduto/preco-quantidade', precoQuantidadeController.addProdutoNaEstanteComPrecoEQuantidade);

router.put('/estantes/:idEstante/produtos/:idProduto/preco-quantidade', precoQuantidadeController.atualizarPrecoQuantidade);

module.exports = router;
