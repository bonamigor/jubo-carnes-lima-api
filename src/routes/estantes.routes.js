const express = require('express');

const router = express.Router();
const estanteController = require('../controllers/estantes.controller');

router.get('/estantes', estanteController.listAllEstantes);

router.get('/estantes/:id', estanteController.listOneEstante);

router.get('/estantes-cliente', estanteController.listAllEstantesCliente);

router.post('/estantes', estanteController.createEstante);

router.put('/estantes', estanteController.updateEstante);

router.delete('/estantes/:id', estanteController.deleteEstante);

module.exports = router;
