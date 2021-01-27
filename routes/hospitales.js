
//* Ruta= /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();

//RUTAS:

//GET obtener hospitales
router.get('/', getHospitales);

//POST crear hospital
//middleware validarJWT - necesito enviar token en Headers
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del Hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

//PUT actualizar hospital
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del Hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital);

//DELETE borrar hospital
router.delete('/:id',
    validarJWT,
    borrarHospital);

module.exports = router;