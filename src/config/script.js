const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const Proceso = require('../models/proceso');
const Simulacion = require('../models/simulacion');

async function seedDatabase() {
  try {
    // Crear usuarios ficticios
    for (let i = 0; i < 10; i++) {
      await Usuario.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10)
      });
    }

    // Crear procesos ficticios
    for (let i = 0; i < 5; i++) {
      await Proceso.create({
        nombre: faker.company.catchPhrase(),
        cantidadTareas: faker.number.int({ min: 1, max: 10 })
      });
    }

    // Crear simulaciones ficticias
    const usuarios = await Usuario.findAll();
    const procesos = await Proceso.findAll();

    for (let i = 0; i < 20; i++) {
      await Simulacion.create({
        calificacion: faker.number.int({ min: 1, max: 100 }),
        UsuarioId: faker.helpers.arrayElement(usuarios).id,
        ProcesoId: faker.helpers.arrayElement(procesos).id
      });
    }

    console.log('Datos ficticios insertados con éxito');
  } catch (error) {
    console.error('Error al insertar datos ficticios:', error);
  }
}

seedDatabase();