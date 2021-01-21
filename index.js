require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConexion } = require('./database/config')

//crear el servidor express (inicializa express)
const app = express();

//Configurar CORS
app.use(cors());

//Base de Datos
dbConexion();

//Rutas:
//req= info desde cliente (Headers...) 
//res= la respuesta del servidor GET http://localhost:3000
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

//puerto donde se levanta la aplicacion desde archivo .env
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})