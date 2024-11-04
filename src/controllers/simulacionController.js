const Simulacion = require('../models/Simulacion');
const Usuario = require('../models/Usuario');
const Proceso = require('../models/Proceso');

const Fallo = require('../models/fallo'); // Asegúrate de importar el modelo de Fallo

exports.createSimulacion = async (req, res) => {
  try {
    // Desestructurar los datos recibidos
    const { UsuarioId, ProcesoId, calificacion, Tiempo, medicina, fallos, acciones } = req.body;
    
    // Crear la simulación primero
    const newSimulacion = await Simulacion.create({ usuarioId: UsuarioId, procesoId: ProcesoId, calificacion, Tiempo, medicina });

    // Procesar la cadena de fallos
    let fallosArray = fallos.split(','); // Separar la cadena de fallos por comas
    fallosArray = fallosArray.map(f => f.trim()); // Eliminar los espacios extra alrededor de cada fallo
    fallosArray = fallosArray.filter(f => f !== ''); // Filtrar los fallos vacíos
    fallosArray = [...new Set(fallosArray)]; // Eliminar duplicados
    
    // Crear un registro de Fallo para cada elemento en fallosArray
    for (const falloDescripcion of fallosArray) {
      await Fallo.create({
        descripcion: falloDescripcion,
        simulacionId: newSimulacion.id // Asociar cada fallo con la simulación recién creada
      });
    }

    // Procesar la cadena de acciones
    let accionesArray = acciones.replace(/^,\s*/, ''); // Eliminar la coma y el espacio inicial si existen
    accionesArray = accionesArray.split(','); // Separar la cadena de acciones por comas
    accionesArray = accionesArray.map(a => a.trim()); // Eliminar los espacios extra alrededor de cada acción
    accionesArray = accionesArray.filter(a => a !== ''); // Filtrar las acciones vacías
    accionesArray = [...new Set(accionesArray)]; // Eliminar duplicados

    // Crear un registro de Accion para cada elemento en accionesArray
    for (const accionDescripcion of accionesArray) {
      await Acciones.create({
        descripcion: accionDescripcion,
        simulacionId: newSimulacion.id // Asociar cada acción con la simulación recién creada
      });
    }
    
    // Devolver la simulación creada junto con los fallos y acciones
    res.status(201).json({ simulacion: newSimulacion, fallos: fallosArray, acciones: accionesArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear simulación, fallos y acciones' });
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
