const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const path = require('path');
const fs = require('fs'); //fileSystem

const fileUpload = (req, res = response) => {

    // Obligatorios: Están definidos en la RUTA y son necesarios ya que sin ellos, no funciona el servicio, estos los leemos con los req.params.busqueda  (por ejemplo)
    // Opcionales: Son los que visualmente no están en la ruta, pero tu sabes que los pueden enviar, y si los envían los usas, pero si no los envían no pasa nada, para esto los leemos así req.query.desde 

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar Tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no es valido (medicos, usuarios u hospitales)'
        });
    }

    //Validar que existe un archivo adjunto
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo adjunto seleccionado'
        });
    }

    //Procesar la imagen...
    //imagen = nombre que le pongo en el body de la peticion
    const file = req.files.imagen;
    //console.log(file);
    const nombreCortado = file.name.split('.'); // wolverine.2.3.jpg 
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo no tiene una extension permitida'
        });
    }

    //Generar el nombre del archivo (usar extension npm -> uuid)
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //actualizar BD
        actualizarImagen(tipo, id, nombreArchivo);

        //res.send('File uploaded!');
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

//controlador para mostrar una imagen
const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    //xa este path requiero arriba -> const path = require('path');
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto (no-img)
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/img-por-defecto/no-img.png`);
        res.sendFile(pathImg);
    }


}

module.exports = {
    fileUpload,
    retornaImagen
}