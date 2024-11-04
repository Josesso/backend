const express = require('express');
const router = express.Router();
const accionesController = require('../controllers/accionController');

router.get('/', accionesController.getAcciones);
router.get('/:id', accionesController.getAccion);

module.exports = router;