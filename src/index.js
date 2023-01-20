require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwtMiddleware = require('./middlewares/jwt.middleware');

const app = express();

// ==> Rotas da API
const index = require('./routes/index');

const exclusions = ['/api/autenticacao'];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors({ origin: 'https://www.jubo-solucoes.com.br' }));
app.use(jwtMiddleware({ exclusions }));

app.use('/api/', index);

module.exports = app;
