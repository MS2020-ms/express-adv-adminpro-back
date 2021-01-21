### BACKEND ###
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
