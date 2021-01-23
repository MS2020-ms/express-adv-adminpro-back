
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //leer el token de los Headers
    const token = req.header('x-token');
    //log se ve en terminal porque paso por el middleware
    console.log(token);

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

module.exports = {
    validarJWT
}