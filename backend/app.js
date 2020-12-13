'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const { User } = require('./sequelize');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.SERVER_PORT);
console.log('Starting server on port '+ process.env.SERVER_PORT);

exports = module.exports = app;
