const express = require('express');

const router = express.Router();
const itemPedidoController = require('../controllers/item-pedido.controller');

// ==> POST http://localhost:3000/api/pedido/pedidoId/adicionar
router.post('/pedido/:pedidoId/adicionar', itemPedidoController.adicionarItemAoPedido);

// ==> PUT http://localhost:3000/api/pedido/pedidoId/atualizar/itemPedidoId
router.put('/pedido/:pedidoId/atualizar/:itemPedidoId', itemPedidoController.atualizaItemNoPedido);

module.exports = router;
