const express = require('express');
const router = express.Router();
const falloController = require('../controllers/falloController');

router.get('/', falloController.getFallos);
router.get('/:id', falloController.getFallo);

module.exports = router;
