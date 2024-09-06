const express = require('express');
const livrosRoutes = require('./routes/livrosRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Rotas
app.use('/api', livrosRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
