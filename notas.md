### BACKEND ###
### Express-MongoDB-MongoAtlas-mongoose

[Abrir terminal: >npm run start:dev] -> servidor local
[Abrir Postman -> AdminPro-Backend] -> peticiones
[Abrir MongoDB Compass: MEAN Atlas] -> base datos

- creo package.json -> archivo de entrada de mi aplicacion (dependencias -> node.modules, scripts..)
  >npm init -y

### Proyecto EXPRESS
- >npm install express --save
- >npm install express@4.17.1 --save (para instalar una version concreta)
- creo archivo index.js
- >node index.js (para levantar mi servidor en terminal)(interpreta JS en el lado del Backend)
- >control+c (para bajar el servidor en terminal)

# instalr nodemon de forma global
- Recarga el server cuando se produce un cambio en mi archivo
- ABRIR: la terminal como administrador
- >npm install -g nodemon
- >nodemon index.js
- En package.json -> "start:dev": "nodemon index.js"
- >npm run start:dev
# rutas en express
- porbar con postman o peticiones.rest

### Mongo Atlas -> para almacenar base de datos en la nube
- https://www.mongodb.com/cloud/atlas/efficiency -> Sign In | Create a Cluster (free)
- Mongo Compass:
  # user: mean_user
  # password: 5Gh24tDg67WOvkhL
- obtengo url mongodb+srv://mean_user:5Gh24tDg67WOvkhL@cluster0.vjkhl.mongodb.net/hospitaldb -> .env

### mongoose Conectar Backend con Mongo Atlas
- https://mongoosejs.com/
- >npm i mongoose
- >npm run start:dev
- configuro mongoose en database/config.js

### variables de entorno
- >npm i dotenv
- creo archivo .env

### configurar CORS
- >npm i cors
- requiero en index.js

### Nuevo Repositorio Github
- creo nuevo repositorio en Github
- >git init
- >git add .
- >git commit -m "Express y CORS"
- >git remote add origin https://github.com/MS2020-ms/express-adv-adminpro-back.git
- >git branch -M main
- >git push -u origin main

- >git tag -a v0.1.0 -m "Inicio de Backend"
- >git push --tags

# Rutas: Path en index.js
# Crear models/usuario.js
# Crear routes/usuarios.js rutas de los servicios del usuario 
# Crear controllers/usuarios.js (solo para mis controladores)

## CRUD

# GET Obtener usuarios
- creo nueva ruta routes/usuarios.js
- crear metodo getUsuarios en controllers/usuarios.js
# POST Crear usuario (usando Postman)
- creo nueva ruta routes/usuarios.js
- crear metodo crearUsuario en controllers/usuarios.js
- primero levantar Mongo Compass -> MEAN Atlas
  user: mean_user
  password: 5Gh24tDg67WOvkhL
- peticion POST con Postman
# Validar que email sea unico
- definir en models/usuario.js que email sea unique
- defino en metodo crearUsuarios en controllers/usuarios.js
# Validar campos obligatorios
- Instalar xa hacer validaciones semiautomaticas en mis rutas:
  >npm i express-validator
- Ir routes/usuarios.js
# Middleware personalizado
- Crear middlewares/validar-campos.js
# Encriptar contrasena
- Instalar
  >npm i bcryptjs
- utilizar en controllers/usuarios.js
- postman crear usuario POST
- Mongo Compass veo mi usuario
# PUT Actualizar un registro de usuario
- creo nueva ruta routes/usuarios.js
- defino en metodo actualizarUsuario en controllers/usuarios.js
# DELETE Borrar un usuario
- creo nueva ruta routes/usuarios.js
- defino en metodo borrarUsuario en controllers/usuarios.js

## Login de Usuario
- creo nueva ruta en index.js
- creo nuevo archivo route/login.js
- creo nuevo archivo controllers/login.js

## Generar un TOKEN - JWT (autenticacion pasiva)
- Instalar
  >npm i jsonwebtoken
- creo nuevo archivo helpers/jwt.js
- archivo .env guardo mi palabra secreta xa firmar mis tokens
- trabajo en archivo controllers/login.js
- Ir a Postman y hacer login -> genera token

## Revision del Token - Middleware = Rutas Protegidas
- Token para getUsuarios -> obliga a hacer login
  se manda en los Headers
  se define en un middleware para poder reutilizarlo
- Creo archivo middlewares/validar-jwt.js
- Incremento en ruta GET -> routes/usuarios.js

- Token para actualizarUsuario y borrarUsuario
- Incremento en ruta PUT y DELETE -> routes/usuarios.js

### CRUD Hospitales
- Creo el modelo en nuevo archivo models/hospital.js
- creo nuevo archivo controllers/hospitales.js
- creo nuevo archivo routes/hospitales.js
- creo las rutas en index.js

### CRUD Medicos
- Creo el modelo en nuevo archivo models/medico.js
- creo nuevo archivo controllers/medicos.js
- creo nuevo archivo routes/medicos.js
- creo las rutas en index.js

# Crear hospitales
# Crear medicos
- routes/medicos.js -> middlewares y validaciones
- controllers/medicos.js ->
# Obtener hospitales (getHospitales)
# Obtener medicos (getMedicos)

## Paginar manualmente resultados de busqueda ( *existen lib de mongoose)
- ir controllers/usuarios.js

### Controlador de BUSQUEDA (search en TODAS las colecciones)
- creo nueva ruta en el index.js
- creo nuevo archivo routes/busquedas.js
- creo nuevo archivo controllers/busquedas.js

# Controlador de BUSQUEDA (search en UNA coleccion)
- ir archivo  routes/busquedas.js
- ir archivo  controllers/busquedas.js

### Subir archivos (imagen, pdf, excel...) al Servidor
- creo nueva carpeta uploads y dentro tres carpetas medicos, usuarios y hospitales
- creo nueva ruta index.js
- creo nuevo archivo routes/uploads.js
- creo nuevo archivo controllers/uploads.js
- npm express-fileupload
  >npm i express-fileupload
# asignar un id (identificador unico) a las imagenes que subo
- npm uuid
  >npm install uuid
# asignar la imagen a un usuario, medico o hospital
- creo nuevo archivo helpers/actualizar-imagen.js
- ir archivo controllers/uploads.js
# ruta para obtener imagenes
- ir archivo routes/uploads.js
- ir archivo controllers/uploads.js
- incluir imagen no-img en carpeta uploads/img-por-defecto