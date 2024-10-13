const Simulacion = require('../models/Simulacion');
const Usuario = require('../models/Usuario');
const Proceso = require('../models/Proceso');

exports.createSimulacion = async (req, res) => {
  try {
    console.log(req.body);
    const { UsuarioId, ProcesoId, calificacion,Tiempo,medicina } = req.body;
    const newSimulacion = await Simulacion.create({ UsuarioId, ProcesoId, calificacion,Tiempo,medicina });
    res.status(201).json(newSimulacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear simulación' });
  }
};

exports.getSimulaciones = async (req, res) => {
  try {
    const simulaciones = await Simulacion.findAll({ include: [Usuario, Proceso] });
    res.status(200).json(simulaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener simulaciones' });
  }
};

exports.getSimulacion = async (req, res) => {
  try {
    const simulacion = await Simulacion.findByPk(req.params.id, { include: [Usuario, Proceso] });
    if (simulacion) {
      res.status(200).json(simulacion);
    } else {
      res.status(404).json({ error: 'Simulación no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener simulación' });
  }
};

exports.updateSimulacion = async (req, res) => {
  try {
    const { UsuarioId, ProcesoId, calificacion } = req.body;
    const [updated] = await Simulacion.update({ UsuarioId, ProcesoId, calificacion }, { where: { id: req.params.id } });
    if (updated) {
      const updatedSimulacion = await Simulacion.findByPk(req.params.id, { include: [Usuario, Proceso] });
      res.status(200).json(updatedSimulacion);
    } else {
      res.status(404).json({ error: 'Simulación no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar simulación' });
  }
};

exports.deleteSimulacion = async (req, res) => {
  try {
    const deleted = await Simulacion.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Simulación no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar simulación' });
  }
};
