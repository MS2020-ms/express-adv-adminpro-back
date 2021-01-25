
const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    //referencia a que persona lo creo (extraigo del token)
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    //referencia a que hospital pertenece (por id de hospital en el body)
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

//configuracion extraigo la version __v para no visualizarlo
MedicoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

//mongoose le pondra el nombre a mi base de datos en plural 'Medicos'
module.exports = model('Medico', MedicoSchema);