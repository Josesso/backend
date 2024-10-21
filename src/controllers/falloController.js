const Fallo = require('../models/fallo');

// Crear un nuevo fallo
exports.createFallo = async (req, res) => {
  try {
    const { descripcion, SimulacionId } = req.body; // Asegúrate de que envíes id_simulacion en el cuerpo de la solicitud
    const newFallo = await Fallo.create({ descripcion, SimulacionId });
    res.status(201).json(newFallo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear fallo' });
  }
};


// Obtener todos los fallos
exports.getFallos = async (req, res) => {
  try {
    const fallos = await Fallo.findAll();
    res.status(200).json(fallos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener fallos' });
  }
};

// Obtener un fallo por ID
exports.getFallo = async (req, res) => {
  try {
    const fallo = await Fallo.findByPk(req.params.id);
    if (fallo) {
      res.status(200).json(fallo);
    } else {
      res.status(404).json({ error: 'Fallo no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener fallo' });
  }
};

// Actualizar un fallo por ID
exports.updateFallo = async (req, res) => {
  try {
    const { descripcion, id_simulacion } = req.body;
    const fallo = await Fallo.findByPk(req.params.id);

    if (fallo) {
      fallo.descripcion = descripcion;
      fallo.simulacionId = id_simulacion; // Asegúrate de que se envíe el id_simulacion
      await fallo.save();
      res.status(200).json(fallo);
    } else {
      res.status(404).json({ error: 'Fallo no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar fallo' });
  }
};

// Eliminar un fallo por ID
exports.deleteFallo = async (req, res) => {
  try {
    const fallo = await Fallo.findByPk(req.params.id);
    if (fallo) {
      await fallo.destroy();
      res.status(200).json({ message: 'Fallo eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Fallo no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar fallo' });
  }
};