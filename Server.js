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

var listaUsuarios = Array();
var puntuacion = Array();
var listaPreguntas = Array();

// Conexiones de los sockets
io.on('connection', socket => {
    console.log('socket connected: ', socket.id);

    socket.on('hola', (data) => {
      console.log(data);
      socket.id = Proyector;
      console.log(socket.id);
    });

    if (socket.id === "Proyector") {

      socket.on('ObtenerPreguntas', (datos) => {
        listaPreguntas = preguntas.listarPreguntasCuestionario(datos);
        socket.broadcast.to("Proyector").emit('Preguntas', listaPreguntas);
      });

      for (var i = 0; i < listaPreguntas.length; i++) {
        setTimeout(console.log.bind(null, 'Two second later'), 2000);
      }
    }
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
  res.send('true');
});

// Listar cuestionarios (req = user)
app.get('/listar/cuestionarios', (req, res) => {
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

  console.log('Estoy en /insertar/pregunta: ', req.body)
  preguntas.insertarPregunta([req.body.id_cues, req.body.id_pre, req.body.pre, req.body.resp1, req.body.resp2, req.body.resp3, req.body.resp4, req.body.correcta]);
  res.send('hola');
});

// Eliminar pregunta (req = id_cues, id_pre)
app.post('/eliminar/pregunta', (req, res) => {

  console.log('Estoy en /eliminar/pregunta: ', req.body)
  preguntas.eliminarPregunta([req.body.id_cues, req.body.id_pre]);
  res.send('true');
});

// Listar preguntas (req = id_cues)
app.post('/listar/preguntas', (req, res) => {

  console.log('Estoy en /listar/preguntas: ', req.body)
  var cues = preguntas.listarPreguntasCuestionario(req.body.id_cues);
  console.log('Estoy en /listar/preguntas: ', cues);
  res.send(cues);
});

//Modificar pregunta (req = id_cues, id_pre, pre, resp, correcta)
app.post('/modificar/pregunta', (req, res) => {
  
  console.log('Estoy en /modificar/pregunta: ', req.body)
  preguntas.modificarPregunta([req.body.id_cues, req.body.id_pre, req.body.pre, req.body.resp1, req.body.resp2, req.body.resp3, req.body.resp4, req.body.correcta]);
  res.send('hola');
});

//Última pregunta (req = id_cues)
app.post('/ultima/pregunta', (req, res) => {
  
  console.log('Estoy en /ultima/pregunta: ', req.body)
  var max = preguntas.obtenerUltimaPreguntaInsertada(req.body.id_cues);
  res.send(max);
});