
const { response } = require('express');
const bcrypt = require('bcryptjs');

const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email:
        const usuarioDB = await usuario.findOne({ email });

        //si NO existe el email en mi BD -> envio mensaje
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o Password no validos!'
            });
        }

        //Verificar password:
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password o Email no validos!'
            });
        }

        //Generar TOKEN - JWT al hacer Login
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Hable con el administrador'
        });
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        //tomar esta informacion que viene del googleToken y crear un usuario en la BD
        const { name, email, picture } = await googleVerify(googleToken);

        //verificar si usuario existe
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        //si no existe usuario en BD, creo uno nuevo:
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
            //si existe usuario en BD
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        //guardar en BD
        await usuario.save();

        //Generar TOKEN en backend - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Todo OK',
            token: token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }


}

module.exports = {
    login,
    googleSignIn
}