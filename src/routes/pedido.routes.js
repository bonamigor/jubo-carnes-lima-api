const express = require('express');

const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');

// ==> GET http://localhost:3000/api/pedidos
router.get('/pedidos', pedidosController.listAllPedidos);

// ==> GET http://localhost:3000/api/pedidos/id
router.get('/pedidos/:pedidoId', pedidosController.listOnePedido);

// ==> PUT http://localhost:3000/api/pedidos/pedidoId/cancelar
router.put('/pedidos/:pedidoId/cancelar', pedidosController.cancelaPedido);

// ==> PUT http://localhost:3000/api/pedidos/pedidoId/confirmar
router.put('/pedidos/:pedidoId/confirmar', pedidosController.confirmaPedido);

// ==> PUT http://localhost:3000/api/pedidos/pedidoId/entregar
router.put('/pedidos/:pedidoId/entregar', pedidosController.entregaPedido);

// ==> POST http://localhost:3000/api/pedidos
router.post('/pedidos', pedidosController.createPedido);

// ==> DELETE http://localhost:3000/api/pedidos
router.delete('/pedidos/:pedidoId', pedidosController.deletePedido);

module.exports = router;
