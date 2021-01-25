
//* Ruta= /api/upload

const { Router } = require('express');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

//RESTRINGIR Tamano de imagen
/* router.use(expressFileUpload({
     limits: { fileSize: 50 * 1024 * 1024 },
   }));
  router.use(expressFileUpload({
     limits: { fileSize: 1000000 }, //1mb 
     abortOnLimit: true
  })); */

//RUTAS:

//PUT subir archivo a BD
router.put('/:tipo/:id', validarJWT, fileUpload);

//GET obtener archivo a BD
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;