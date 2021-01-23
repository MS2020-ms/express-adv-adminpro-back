const { response } = require('express');
const { validationResult } = require('express-validator');

//Como un controlador con next, se llama si pasa los middelwares
const validarCampos = (req, res = response, next) => {
    //No se ejecuta si pasa todas las validaciones -> routes/usuarios.js
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    //si todo sale bien
    next();
}

module.exports = {
    validarCampos
}