require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConexion } = require('./database/config')

//crear el servidor express (inicializa express)
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del Body - ANTES DE LAS RUTAS
app.use(express.json());

//Base de Datos
dbConexion();

//RUTAS:
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/login'));


//puerto donde se levanta la aplicacion desde archivo .env
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})