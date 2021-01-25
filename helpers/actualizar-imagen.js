const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    //Validar si ya tiene una imagen asignada
    if (fs.existsSync(path)) {
        //borrar imagen antigua
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    //console.log('Vamos bien!');

    let pathAntiguo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            //Validar si existe el medico
            if (!medico) {
                console.log('No se encontro medico por id');
                return false;
            }
            //Validar si ya tiene una imagen asignada
            pathAntiguo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathAntiguo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            //Validar si existe el medico
            if (!hospital) {
                console.log('No se encontro hospital por id');
                return false;
            }
            //Validar si ya tiene una imagen asignada
            pathAntiguo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathAntiguo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            //Validar si existe el medico
            if (!usuario) {
                console.log('No se encontro usuario por id');
                return false;
            }
            //Validar si ya tiene una imagen asignada
            pathAntiguo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathAntiguo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}