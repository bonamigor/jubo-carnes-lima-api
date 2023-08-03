const express = require('express');

const router = express.Router();
const estanteController = require('../controllers/estantes.controller');

// ==> GET http://localhost:3000/api/estantes
router.get('/estantes', estanteController.listAllEstantes);

// ==> GET http://localhost:3000/api/estantes/id
router.get('/estantes/:id', estanteController.listOneEstante);

// ==> GET http://localhost:3000/api/estantes-cliente
router.get('/cliente/:id/estantes', estanteController.listAllEstantesCliente);

// ==> POST http://localhost:3000/api/estantes
router.post('/estantes', estanteController.createEstante);

// ==> PUT http://localhost:3000/api/estantes
router.put('/estantes', estanteController.updateEstante);

// ==> DELETE http://localhost:3000/api/estantes/id
router.delete('/estantes/:id', estanteController.deleteEstante);

// ==> PATCH http://localhost:3000/api/estantes/id
router.patch('/estantes/:id/:status', estanteController.alterarEstadoDaEstante);

module.exports = router;
