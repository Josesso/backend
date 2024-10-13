const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proceso = sequelize.define('Proceso', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidadTareas: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Proceso;
