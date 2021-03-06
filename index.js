require('dotenv').config();

const path = require('path');

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

//Directorio publico
app.use(express.static('public'));

//RUTAS:
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/login'));


//si no pasa por estas rutas, que haga lo siguiente:
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

//puerto donde se levanta la aplicacion desde archivo .env
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
