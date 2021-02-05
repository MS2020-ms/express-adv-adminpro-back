
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    //leer el token de los Headers
    const token = req.header('x-token');
    //log se ve en terminal porque paso por el middleware
    //console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion (Headers)'
        });
    }

    //verificar token
    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log(uid);
        req.uid = uid;
        //si todo sale bien
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        });
    }

}

const validarADMIN_ROLE = async (req, res, next) => {

    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe!'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene role ADMIN para hacer esto'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

//middleware validarADMIN_ROLE_o_MismoUsuario - solo si tengo role ADMIN o soy el mismo usuario xa poder editar mi perfil (id es el mismo que esta en el token)
const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe!'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene role ADMIN para hacer esto'
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}