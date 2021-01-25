
//* Ruta: /api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/login');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        //validaciones
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login
);

router.post('/google',
    [
        //validaciones
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
)

module.exports = router;