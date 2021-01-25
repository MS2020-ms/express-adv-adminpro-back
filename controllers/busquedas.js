
//buscarTotal = buscar en todas las colecciones (usuarios, medicos, hospitales)

const { response } = require('express'); //xa obtener el tipado del tipo response

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

//BUSQUEDA EN TODAS COLECCIONES:
const buscarTotal = async (req, res = response) => {

    try {

        //en routes/busqueda definido '/:busqueda'
        const busqueda = req.params.busqueda;
        //xa poder buscar por nombre, pellido, palabra -> expresion regular (i = insensible)
        const regexp = new RegExp(busqueda, 'i');

        const [usuarios, hospitales, medicos] = await Promise.all([
            //los modelos usuarios, hospitales y medicos tienen un propiedad = nombre
            Usuario.find({ nombre: regexp }),
            Hospital.find({ nombre: regexp }),
            Medico.find({ nombre: regexp })
        ])

        //LISTA LO QUE VOY A VER AL HACER buscarTotal
        res.json({
            ok: true,
            busqueda: busqueda,
            usuarios: usuarios,
            hospitales: hospitales,
            medicos: medicos,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Busqueda no actualizada'
        });
    }
}

//BUSQUEDA EN UNA COLECCION ESPECIFICA:
const buscarDocumentosColeccion = async (req, res = response) => {

    try {
        //en routes/busqueda definido '/coleccion/:tabla/:busqueda'
        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;
        //xa poder buscar por el nombre, apellido, palabra -> expresion regular (i = insensible)
        const regexp = new RegExp(busqueda, 'i');

        let data = [];

        switch (tabla) {
            case 'medicos':
                //populate() [mongoose] xa saber quien creo el medico (usuario y hospital asignado)
                data = await Medico
                    .find({ nombre: regexp })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                break;

            case 'hospitales':
                //populate() [mongoose] xa saber quien creo el hospital (usuario)
                data = await Hospital
                    .find({ nombre: regexp })
                    .populate('usuario', 'nombre img');
                break;

            case 'usuarios':
                data = await Usuario.find({ nombre: regexp });

                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos o hospitales'
                });
        }

        //LISTA LO QUE VOY A VER AL HACER buscarDocumentosColeccion
        res.json({
            ok: true,
            usuarios: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...Busqueda no actualizada'
        });
    }
}

module.exports = {
    buscarTotal,
    buscarDocumentosColeccion
}