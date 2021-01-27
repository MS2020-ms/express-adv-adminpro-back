
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
    //uid viene del token
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

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    //uid viene del token
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado con ese id'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Medico no actualizado...Hable con el administrador'
        });
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado con ese id'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Medico no eliminado...Hable con el administrador'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}