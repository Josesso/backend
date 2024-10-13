const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Proceso = require('./Proceso');

const Simulacion = sequelize.define('Simulacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Tiempo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  medicina:{
    type: DataTypes.STRING,
    allowNull: true
  }
});

Usuario.hasMany(Simulacion);
Simulacion.belongsTo(Usuario);
Proceso.hasMany(Simulacion);
Simulacion.belongsTo(Proceso);

module.exports = Simulacion;
