require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apidocsRouter = require('./routes/apidocsRouter');
app.use('/api-docs', apidocsRouter);

const usuariosRouter = require('./routes/usuariosRouter');
app.use('/usuarios', usuariosRouter);

module.exports = app;