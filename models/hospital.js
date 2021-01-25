
const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
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
    }
    //Xa aparezca en mi BD como hospitales y no como hospital+s
}, { collection: 'hospitales' });

//configuracion extraigo la version __v para no visualizarlo
HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

//mongoose le pondra el nombre a mi base de datos en plural 'Hospitales'
module.exports = model('Hospital', HospitalSchema);