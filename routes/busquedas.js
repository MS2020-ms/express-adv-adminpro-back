
//* Ruta= /api/todo/ + :busqueda
//* Ruta= /api/todo/ + coleccion/:tabla/:busqueda

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { buscarTotal, buscarDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

//RUTAS:

//GET buscar por palabra en TODAS las colecciones
router.get('/:busqueda', validarJWT, buscarTotal);
//GET buscar por palabra en UNA coleccion
router.get('/coleccion/:tabla/:busqueda', validarJWT, buscarDocumentosColeccion);

module.exports = router;