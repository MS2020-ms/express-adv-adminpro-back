const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

//req= info desde cliente (Headers, Body) 
//res= la respuesta del servidor

//Obtener usuarios 
const getUsuarios = async (req, res) => {

    //para paginar manualmente la lista de respuesta
    //localhost:3000/api/usuarios?desde=5

    // Obligatorios: Están definidos en la RUTA y son necesarios ya que sin ellos, no funciona el servicio, estos los leemos con los req.params.busqueda  (por ejemplo)
    // Opcionales: Son los que visualmente no están en la ruta, pero tu sabes que los pueden enviar, y si los envían los usas, pero si no los envían no pasa nada, para esto los leemos así req.query.desde 
    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    //defino lo que quiero recibir al hacer getUsuarios -> 'nombre email img role google'
    //paginar -> skip(saltar desde) y limit(n° elementos)
    // const usuarios = await Usuario
    //     .find({}, 'nombre email img role google')
    //     .skip(desde)
    //     .limit(5);

    //xa contar cuantos usuarios tengo en mi BD
    // const total = await Usuario.countDocuments();

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email img role google')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ]);

    //LISTA LO QUE VOY A VER AL HACER GET USUARIOS
    res.json({
        ok: true,
        usuarios: usuarios,
        uid: req.uid, //uid del usuario que hizo la peticion (ver middleware/validar-jwt.js)
        total: total
    });
}

//crear usuario
const crearUsuarios = async (req, res = response) => {
    //console.log(req.body);
    const { nombre, password, email } = req.body;

    try {

        //verificar que se escribio un email correcto
        const existeEmail = await Usuario.findOne({ email });

        //si YA existe el email en mi BD -> envio mensaje
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email indicado ya esta registrado!'
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar contasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardo usuario en mi BD
        await usuario.save();

        //Generar el TOKEN -JWT al crear usuario
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario: usuario,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Usuario no creado'
        });
    }

}

//actualizar usuario
const actualizarUsuario = async (req, res = response) => {

    //Todo: Validar token y conprobar si es el usuario correcto!!!
    //en routes/usuarios definido '/:id'
    const uid = req.params.id;

    try {
        //comprobar que existe un usuario con ese id
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Usuario con ese id'
            })
        }

        //Actualizacion
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Usuario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Usuario no actualizado'
        });
    }
}

//borrar usuario
const borrarUsuario = async (req, res = response) => {

    //en routes/usuarios definido '/:id'
    const uid = req.params.id;

    try {
        //comprobar que existe un usuario con ese id
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Usuario con ese id'
            })
        }

        //borrar usuario - tambien puedo solo desactivarlos!!!
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Usuario no borrado..Hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}