// DEFINIÇÃO DEFAULT DE VARIÁVEIS DE AMBIENTE
require('dotenv').config();
const _ = require('lodash');

const PORT = (process.env.PORT || 3000);

const ENV = _.merge({
  PORT,
}, process.env);

module.exports = ENV;
