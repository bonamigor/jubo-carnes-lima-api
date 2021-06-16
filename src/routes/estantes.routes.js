const express = require('express');

const router = express.Router();
const estanteController = require('../controllers/estantes.controller');

// ==> GET http://localhost:3000/api/estantes
router.get('/estantes', estanteController.listAllEstantes);

// ==> GET http://localhost:3000/api/estantes/id
router.get('/estantes/:id', estanteController.listOneEstante);

// ==> GET http://localhost:3000/api/estantes-cliente
router.get('/estantes-cliente', estanteController.listAllEstantesCliente);

// ==> POST http://localhost:3000/api/estantes
router.post('/estantes', estanteController.createEstante);

// ==> PUT http://localhost:3000/api/estantes
router.put('/estantes', estanteController.updateEstante);

// ==> DELETE http://localhost:3000/api/estantes
router.delete('/estantes/:id', estanteController.deleteEstante);

module.exports = router;
