const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Simulacion = require('./Simulacion');

const acciones = sequelize.define('accciones', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true, // No pluralizar el nombre de la tabla
});

Simulacion.hasMany(acciones);
acciones.belongsTo(Simulacion);
module.exports = acciones;
