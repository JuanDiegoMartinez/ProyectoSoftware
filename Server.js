// Bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const session = require('express-session');
const gsockets = require('./GestorSockets');
const ghttp = require('./GestorHTTP');

// Webpack (para conectar con react)
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

// Creación del server http y socket
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware webpack para poder utilizar react
app.use(webpackDevMiddleware(webpack(config)));

// Decirle a express donde se encuentran las vistas
app.use(express.static(path.join(__dirname, 'Views')));

// Middleware para gestionar las sesiones
app.use(session({
  secret: "secreto",
  resave: "false",
  saveUninitialized: "false"
}));

// Delegar la definición de interacciones relacionadas con sockets a GestorSockets.js
gsockets.definirInteracciones(io)

// Server localhost:4000
server.listen(4000, () => {
    console.log('server on port 4000');
});

// conectar con api para comunicar con react
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Delegar la definición de interacciones relacionadas con conexiones HTTP a GestorHTTP.js
ghttp.definirInteracciones(app)