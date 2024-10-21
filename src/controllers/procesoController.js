const Proceso = require('../models/proceso');

exports.createProceso = async (req, res) => {
  try {
    const { nombre, cantidadTareas } = req.body;
    const newProceso = await Proceso.create({ nombre, cantidadTareas });
    res.status(201).json(newProceso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear proceso' });
  }
};

exports.getProcesos = async (req, res) => {
  try {
    const procesos = await Proceso.findAll();
    res.status(200).json(procesos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener procesos' });
  }
};

exports.getProceso = async (req, res) => {
  try {
    const proceso = await Proceso.findByPk(req.params.id);
    if (proceso) {
      res.status(200).json(proceso);
    } else {
      res.status(404).json({ error: 'Proceso no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener proceso' });
  }
};

exports.updateProceso = async (req, res) => {
  try {
    const { nombre, cantidadTareas } = req.body;
    const [updated] = await Proceso.update({ nombre, cantidadTareas }, { where: { id: req.params.id } });
    if (updated) {
      const updatedProceso = await Proceso.findByPk(req.params.id);
      res.status(200).json(updatedProceso);
    } else {
      res.status(404).json({ error: 'Proceso no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar proceso' });
  }
};

exports.deleteProceso = async (req, res) => {
  try {
    const deleted = await Proceso.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Proceso no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar proceso' });
  }
};
