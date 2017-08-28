// DEFINIÇÃO DEFAULT DE VARIÁVEIS DE AMBIENTE
require('dotenv').config();
const _ = require('lodash');
const { name, version, description, config } = require('../package.json');
const PORT = (process.env.PORT || 3000);

const ENV = _.merge({
  PORT,
  PUBLIC_DIR: '../client/build',
}, { name, version, description, config }, process.env);

module.exports = ENV;
