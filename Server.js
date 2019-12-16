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

//BBDD de la parte de los usuarios
const usuarios = require('./BBDD/QuerysUsuarios');

// Login usuario (req = user, pass)
app.post('/login/usuario', function(req, res) {
  
  console.log('Estoy en /login/usuario: ', req.body);
  var login = usuarios.loginUsuario([req.body.user, req.body.pass]);

  if (login == true) {
    req.session.user = req.body.user;
    console.log('Estoy en /login/usuario: ', req.session);
    console.log('Estoy en /login/usuario: ', req.session.user);
  }
  res.send(login);
});

// Registro del usuario (req = user, pass, email)
app.post('/registro/usuario', (req, res) => {

  console.log('Estoy en /registro/usuario: ', req.body)
  usuarios.insertarUsuario([req.body.user, req.body.pass, req.body.email]);
  res.send('Usuario registrado');
});

// Modificar datos usuario (req = pass, email)
app.post('/modificar/usuario', (req, res) => {

  console.log('Estoy en /modificar/usuario: ', req.body);
  if (req.session.user === undefined) {
    res.send('Debes estar registrado');
  }
  else {
    usuarios.modificarUsuario([req.session.user, req.body.pass, req.body.email]);
    res.send('Usuario modificado');
  }
});

// Obtener datos usuario (req = user)
app.get('/datos/usuario', (req, res) => {  

  console.log('Estoy en /datos/usuario: ', req.session.user);
  if (req.session.user === undefined) {
    console.log('error');
    res.send('Debes estar registrado');
  }
  else {
    var datos = usuarios.datosUsuario(req.session.user);
    console.log('Estoy en /datos/usuario: ', datos);
    res.send(datos);
  }
});

//BBDD de la parte de los cuestionarios
const cuestionarios = require('./BBDD/QuerysCuestionarios');

// Insertar cuestionario (req = user, id_cues, nombre, asig)
app.post('/insertar/cuestionario', (req, res) => {
  
  console.log('Estoy en /insertar/cuestionario: ', req.body);
  cuestionarios.insertarCuestionario([req.session.user, req.body.nombre, req.body.asig]);
  res.send('cuestionario insertado');
});

// Eliminar cuestionario (req = id_cues)
app.post('/eliminar/cuestionario', (req, res) => {

  console.log('Estoy en /eliminar/cuestionario: ', req.body)
  cuestionarios.eliminarCuestionario(req.body.id_cues);
  res.send('cuestionario eliminado');
});

// Listar cuestionarios (req = user)
app.get('/listar/cuestionarios', (req, res) => {
  var hehehe = [];
  console.log('Estoy en /listar/cuestionarios: ', req.session.user)
  var cues = cuestionarios.listarCuestionarios(req.session.user);
  console.log('Estoy en /listar/cuestionarios: ', cues);
  res.send(cues);
});

//Modificar cuestionario (req = user, id_cues, nombre, asig)
app.post('/modificar/cuestionario', (req, res) => {

  console.log('Estoy en /modificar/cuestionario: ', req.body);
  cuestionarios.modificarCuestionario([req.session.user, req.body.id_cues, req.body.nombre, req.body.asig]);
  res.send('Cuestionario modificado');
});

//BBDD de la parte de las preguntas
const preguntas = require('./BBDD/QuerysPreguntas');

// Insertar pregunta (req = id_cues, id_pre, pre, resp, correcta)
app.post('/insertar/pregunta', (req, res) => {
  preguntas.insertarPregunta(req.body);
  res.send('hola');
});

// Eliminar pregunta (req = id_cues, id_pre)
app.post('/eliminar/pregunta', (req, res) => {
  preguntas.eliminarPregunta(req.body);
  res.send('hola');
});

// Listar preguntas (req = id_cues)
app.post('/listar/preguntas', (req, res) => {
  var cues = preguntas.listarPreguntasCuestionario(req.body);
  res.send(cues);
});

//Modificar pregunta (req = id_cues, id_pre, pre, resp, correcta)
app.post('/modificar/pregunta', (req, res) => {
  preguntas.modificarPregunta(req.body);
  res.send('hola');
});

exports.app = app;