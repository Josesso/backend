const express = require('express');
const router = express.Router();
const procesoController = require('../controllers/procesoController');

router.post('/', procesoController.createProceso);
router.get('/', procesoController.getProcesos);
router.get('/:id', procesoController.getProceso);
router.put('/:id', procesoController.updateProceso);
router.delete('/:id', procesoController.deleteProceso);

module.exports = router;
