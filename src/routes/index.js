const express = require('express');

const clienteRoutes = require('./clientes.routes');
const estanteRoutes = require('./estantes.routes');
const produtoRoutes = require('./produtos.routes');
const estanteProdutoRoutes = require('./estante-produto.routes');
const precoQuantidadeRoutes = require('./preco-quantidade.routes');

const router = express.Router();

router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Seja bem-vindo(a) a API Node.js + PostgreSQL + Azure',
    version: '1.0.0',
  });
});

module.exports = [
  router,
  clienteRoutes,
  estanteRoutes,
  produtoRoutes,
  estanteProdutoRoutes,
  precoQuantidadeRoutes];
