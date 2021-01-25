
const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    //dentro del find() se pueden poner condiciones
    //populate() [propiedad de mongoose] xa saber quien creo el medico (usuario) y su hospital
    const medicos = await Medico
        .find()
        .populate('usuario', 'nombre email img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos: medicos
    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        //guardo en BD
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Medico no creado...Hable con el administrador'
        });
    }
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}