const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const Proceso = require('../models/proceso');
const Simulacion = require('../models/simulacion');

async function seedDatabase() {
  try {
    await Usuario.create({
        username: "Cristian",
        email: "Herbas68@gmail.com",
        password: await bcrypt.hash('herbas123', 10)
      });
    console.log('Datos ficticios insertados con éxito');
  } catch (error) {
    console.error('Error al insertar datos ficticios:', error);
  }
}

seedDatabase();