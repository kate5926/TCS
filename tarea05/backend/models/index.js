const sequelize = require('../config/db');
const Placa = require('./Placa');
const Conductor = require('./Conductor');

// Sin asociaciones por ahora: Placas y Conductores son modulos independientes.
module.exports = { sequelize, Placa, Conductor };
