const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proceso = sequelize.define('proceso', {
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
}, {
  freezeTableName: true, // No pluralizar el nombre de la tabla
});

module.exports = Proceso;
//hola