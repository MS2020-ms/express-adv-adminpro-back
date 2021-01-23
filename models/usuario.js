
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

//configuracion xa cambiar el nombre de _id (por defecto mongoose) personalizada por user_id
//extraigo el password de la respuesta
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.user_id = _id;
    return object;
});

//mongoose le pondra el nombre a mi base de datos en plural 'Usuarios'
module.exports = model('Usuario', UsuarioSchema);