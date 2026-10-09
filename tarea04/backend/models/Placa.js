const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Placa independiente (tracto o carreta), formulario minimo: placa + categoria.
const Placa = sequelize.define('Placa', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  placa: { type: DataTypes.STRING(10), allowNull: false, unique: true },
  categoria: { type: DataTypes.ENUM('tracto', 'carreta'), allowNull: false },
}, {
  tableName: 'placas',
  timestamps: true,
});

module.exports = Placa;
