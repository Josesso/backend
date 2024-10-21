const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Proceso = require('./proceso');

const Simulacion = sequelize.define('simulacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  calificacion: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Tiempo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  medicina:{
    type: DataTypes.STRING,
    allowNull: true
  }, 
},
{
    freezeTableName: true, // No pluralizar el nombre de la tabla
  }
);

Usuario.hasMany(Simulacion);
Simulacion.belongsTo(Usuario);
Proceso.hasMany(Simulacion);
Simulacion.belongsTo(Proceso);

module.exports = Simulacion;
