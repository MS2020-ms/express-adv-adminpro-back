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

    //uid viene del token
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

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Hospital no creado...Hable con el administrador'
        });
    }

}

const actualizarHospital = async (req, res = response) => {
    //uid viene del token
    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado con ese id'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Hospital no actualizado...Hable con el administrador'
        });
    }

}

const borrarHospital = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado con ese id'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Hospital no eliminado...Hable con el administrador'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}