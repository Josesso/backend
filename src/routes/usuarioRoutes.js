const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticateJWT } = require('../controllers/Auth');

router.post('/', usuarioController.createUsuario);
router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/logout', usuarioController.logoutUsuario);
router.post('/profile', authenticateJWT, usuarioController.profile);

module.exports = router;
