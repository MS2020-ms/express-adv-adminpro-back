
//* Ruta: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
} = require('../controllers/usuarios');

const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

//RUTAS:

//GET obtener usuarios
//middleware validarJWT - necesito enviar token en Headers
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
//middleware validarJWT - necesito enviar token en Headers
//middleware validarADMIN_ROLE_o_MismoUsuario - solo si tengo role ADMIN o soy el mismo usuario xa poder editar mi perfil (id es el mismo que esta en el token)
router.put('/:id',
    [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        //validaciones
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);

//DELETE borrar usuario
//middleware validarJWT y validarADMIN_ROLE
router.delete('/:id',
    [validarJWT, validarADMIN_ROLE],
    borrarUsuario);

module.exports = router;