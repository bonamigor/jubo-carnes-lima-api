const express = require('express');

const router = express.Router();
const clienteController = require('../controllers/clientes.controller');

// ==> GET http://localhost:3000/api/clientes
router.get('/clientes', clienteController.listAllClientes);

// ==> GET http://localhost:3000/api/clientes/id
router.get('/clientes/:id', clienteController.listOneCliente);

// ==> POST http://localhost:3000/api/clientes
router.post('/clientes', clienteController.createCliente);

// ==> PUT http://localhost:3000/api/clientes
router.put('/clientes', clienteController.updateCliente);

// ==> DELETE http://localhost:3000/api/clientes
router.delete('/clientes', clienteController.deleteCliente);

module.exports = router;
