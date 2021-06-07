const express = require('express');

const router = express.Router();
const precoQuantidadeController = require('../controllers/preco-quantidade.controller');

router.get('/estantes/:id/produtos/preco-quantidade', precoQuantidadeController.listarDetalhado);

router.post('/estantes/:idEstante/produtos/:idProduto/preco-quantidade', precoQuantidadeController.AddProdutoNaEstanteComPrecoEQuantidade);

module.exports = router;
