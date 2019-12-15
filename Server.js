// Librerias
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const session = require('express-session');

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

// Conexiones de los sockets
io.on('connection', socket => {
    console.log('socket connected: ', socket.id);

    socket.on('hola', (data) => {
      console.log(data);
    });
});

// Server localhost:4000
server.listen(4000, () => {
    console.log('server on port 4000');
});

// conectar con api para comunicar con react
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usuarios = require('./BBDD/QuerysUsuarios');

// test para leer la respuesta, esto en un futuro hara un acceso a la bbdd y devolvera la respuesta
app.post('/login', function(req, res) {
  var b = usuarios.loginUsuario(req.body);
  res.send(b);
});

//Registro del usuario
app.post('/registro', (req, res) => {
  console.log('Toda la request: ', req.body);
  var datos = [req.body.postUser, req.body.postPass, req.body.postEmail];
  console.log(datos);
  usuarios.insertarUsuario(datos);
  res.send('User= ', req.body.postUser, 'Pass= ', req.body.postPass, 'Email= ', req.body.postEmail);
});

//Modificar datos usuario
