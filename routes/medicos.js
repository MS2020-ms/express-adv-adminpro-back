
//* Ruta: /api/medicos

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
} = require('../controllers/medicos')

const router = Router();

//RUTAS:

//GET obtener medicos
router.get('/', validarJWT, getMedicos);

//POST crear medico
//middleware validarJWT - necesito enviar token en Headers
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del Medico es requerido').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

//PUT actualizar medico
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del Medico es requerido').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico);

//DELETE borrar medico
router.delete('/:id',
    validarJWT,
    borrarMedico);

//GET obtener medico por Id
router.get('/:id',
    validarJWT,
    getMedicoById);

module.exports = router;