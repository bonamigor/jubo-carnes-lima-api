const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');

// ==> GET http://localhost:3000/api/autenticacao
router.post('/autenticacao', authController.authenticate);

module.exports = router;
