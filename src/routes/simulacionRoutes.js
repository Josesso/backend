const express = require('express');
const router = express.Router();
const simulacionController = require('../controllers/simulacionController');

router.post('/', simulacionController.createSimulacion);
router.get('/', simulacionController.getSimulaciones);
router.get('/:id', simulacionController.getSimulacion);
router.put('/:id', simulacionController.updateSimulacion);
router.delete('/:id', simulacionController.deleteSimulacion);

module.exports = router;
