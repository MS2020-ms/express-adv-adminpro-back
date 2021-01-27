const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
    //lo transformo a una promesa
    return new Promise((resolve, reject) => {

        const payload = {
            uid: uid
        }

        //genera token (12 horas de vigencia)
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve(token);
            }

        });
    });

}

module.exports = {
    generarJWT
}