const express = require('express');

const router = express.Router();
const clienteController = require('../controllers/clientes.controller');

router.get('/clientes', clienteController.listAllClientes);

router.get('/clientes/:id', clienteController.listOneCliente);

router.post('/clientes', clienteController.createCliente);

router.put('/clientes', clienteController.updateCliente);

router.delete('/clientes', clienteController.deleteCliente);

module.exports = router;
