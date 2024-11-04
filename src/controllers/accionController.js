const Acciones = require('../models/Acciones');

// Crear una nueva acción
exports.createAccion = async (req, res) => {
  try {
    const { descripcion, SimulacionId } = req.body; // Asegúrate de enviar SimulacionId en el cuerpo de la solicitud
    const newAccion = await Acciones.create({ descripcion, SimulacionId });
    res.status(201).json(newAccion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear acción' });
  }
};

// Obtener todas las acciones
exports.getAcciones = async (req, res) => {
  try {
    const acciones = await Acciones.findAll();
    res.status(200).json(acciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener acciones' });
  }
};

// Obtener una acción por ID
exports.getAccion = async (req, res) => {
  try {
    const accion = await Acciones.findByPk(req.params.id);
    if (accion) {
      res.status(200).json(accion);
    } else {
      res.status(404).json({ error: 'Acción no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener acción' });
  }
};

// Actualizar una acción por ID
exports.updateAccion = async (req, res) => {
  try {
    const { descripcion, SimulacionId } = req.body;
    const accion = await Acciones.findByPk(req.params.id);

    if (accion) {
      accion.descripcion = descripcion;
      accion.SimulacionId = SimulacionId; // Asegúrate de que se envíe el SimulacionId
      await accion.save();
      res.status(200).json(accion);
    } else {
      res.status(404).json({ error: 'Acción no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar acción' });
  }
};

// Eliminar una acción por ID
exports.deleteAccion = async (req, res) => {
  try {
    const accion = await Acciones.findByPk(req.params.id);
    if (accion) {
      await accion.destroy();
      res.status(200).json({ message: 'Acción eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Acción no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar acción' });
  }
};
