const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Simulacion = require('./Simulacion');

const Fallo = sequelize.define('fallo', {
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

Simulacion.hasMany(Fallo);
Fallo.belongsTo(Simulacion);
module.exports = Fallo;
