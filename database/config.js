const mongoose = require('mongoose');

//una funcion con async hace que retorne una Promesa
//url desde mi cluster MEAN Atlas de Mongo Compass (remplazo **** por contrasena)
const dbConexion = async () => {
    try {
        //ruta desde archivo .env
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('BD Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicial la BD -> ver logs');
    }

}

//exportar dbConexion
module.exports = {
    dbConexion
}