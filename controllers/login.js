
const { response } = require('express');
const bcrypt = require('bcryptjs');

const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

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

module.exports = {
    login
}