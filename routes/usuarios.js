
//* Ruta: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//RUTAS:

//GET obtener usuarios
//middleware validarJWT
router.get('/', validarJWT, getUsuarios);

//POST crear usuario (ruta, middleware, controlador)
router.post('/',
    [
        //validaciones
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuarios);

//PUT actualizar usuario
//middleware validarJWT
router.put('/:id',
    [
        validarJWT,
        //validaciones
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);

//DELETE borrar usuario
//middleware validarJWT
router.delete('/:id',
    validarJWT,
    borrarUsuario);

module.exports = router;