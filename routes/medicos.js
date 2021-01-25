
//* Ruta: /api/medicos

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medico')

const router = Router();

//RUTAS:

//GET obtener medicos
router.get('/', getMedicos);

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
    [],
    actualizarMedico);

//DELETE borrar medico
router.delete('/:id',
    borrarMedico);

module.exports = router;