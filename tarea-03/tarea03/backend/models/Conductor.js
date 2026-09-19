const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Conductor = sequelize.define('Conductor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(120), allowNull: false },
  dni: { type: DataTypes.STRING(15), allowNull: false, unique: true },
  numero_licencia: { type: DataTypes.STRING(20), allowNull: false },
}, {
  tableName: 'conductores',
  timestamps: true,
});

module.exports = Conductor;
