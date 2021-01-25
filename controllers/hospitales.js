const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    //dentro del find() se pueden poner condiciones
    //populate() [propiedad de mongoose] xa saber quien creo el hospital (del usuario quiero el nombre, email e img)
    const hospitales = await Hospital
        .find()
        .populate('usuario', 'nombre email img');

    res.json({
        ok: true,
        hospitales: hospitales
    })
}

const crearHospital = async (req, res = response) => {


    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        //guardo en BD
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Hospital no creado...Hable con el administrador'
        });
    }

}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}