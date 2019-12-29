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

// Datos sobre las sesiones
var mapaPuntos = new Map(); 
var mapaCorrectas = new Map(); 

// Conexiones de los sockets
io.on('connection', socket => {
    console.log('Conectado socket:', socket.id);

    // Cuando un profesor envia una pregunta
    // Emitir pregunta a los alumnos y proyectores de la misma sala
    socket.on('submitQuestion', function(pregunta) {
      var sala = Object.keys(io.sockets.adapter.sids[socket.id])[0]
      mapaCorrectas.set(sala, pregunta.correcta)
      socket.broadcast.to(sala).emit('deliverQuestion', pregunta);
      console.log('Estoy en submitQuestion:', pregunta);
      console.log('Emitida pregunta a sala', sala)
    });

    // Cuando un alumno responde
    // Emitir respuesta a los proyectores de la misma sala
    socket.on('answerQuestion', function(respuesta) {
      var sala = Object.keys(io.sockets.adapter.sids[socket.id])[0];
      var puntos = mapaPuntos.get(sala).get(respuesta.nombre);

      if(mapaCorrectas.get(sala) == respuesta.resp) puntos++; 
      else puntos--;

      mapaPuntos.get(sala).set(respuesta.nombre, puntos)
      socket.broadcast.to(sala).emit('deliverAnswer', {nombre: respuesta.nombre, puntos: puntos, resp: respuesta.resp});
      console.log('Estoy en answerQuestion:', respuesta);
      console.log('Emitida respuesta a sala', sala);
    });

    // Cuando un usuario entra en una sala
    // Incluir al nuevo usuario en la sala correspondiente
    socket.on('nuevoUsuario', function(datos) {
      if(mapaPuntos.has(datos.sala)) {
        // Salir de todas las salas anteriores (si las hay)
        var salasUsuario = io.sockets.adapter.sids[socket.id]; 
        for(var s in salasUsuario) { socket.leave(s); }

        // Crear datos de la puntuación si es necesario
        if(!mapaPuntos.get(datos.sala).has(datos.nombre)) { // El alumno no estaba en la sala
          console.log('Nuevo alumno o proyector (', datos.nombre, ') en la sala:', datos.sala);
          socket.broadcast.to(datos.sala).emit('nuevoAlumnoEnSala', datos.nombre)
          mapaPuntos.get(datos.sala).set(datos.nombre, 0)
        }

        // Entrar en la sala
        socket.join(datos.sala)
      } else {
        socket.emit('errorSala', 0)
        console.log('La sala a la que se ha intentado acceder no existe:', datos.sala);
      }
    });

    // Cuando un profesor abre un cuestionario
    // Crear una nueva sala con el id del cuestionario y entrar en ella
    socket.on('nuevaSesion', function(cuestionario) {
      // Salir de todas las salas anteriores (si las hay)
      var salasUsuario = io.sockets.adapter.sids[socket.id]; 
      for(var s in salasUsuario) { socket.leave(s); }

      // Crear datos de la sala
      mapaPuntos.set(cuestionario, new Map())

      // Entrar en la nueva sala
      socket.join(cuestionario)
      console.log('Abierta sala', cuestionario)
    })

    // Cuando un socket se desconecta
    socket.on('disconnect', function() {
      console.log('Desconectado socket:', socket.id);
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

// Insertar pregunta (req = id_cues, id_pre, pre, resp, correcta, tiempo)
app.post('/insertar/pregunta', (req, res) => {
  console.log('Estoy en /insertar/pregunta: ', req.body)
  preguntas.insertarPregunta([req.body.id_cues, req.body.id_pre, req.body.pre, req.body.resp1, req.body.resp2, req.body.resp3, req.body.resp4, req.body.correcta, req.body.tiempo]);
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
  console.log('Tiempo', req.body.tiempo)
  preguntas.modificarPregunta([req.body.id_cues, req.body.id_pre, req.body.pre, req.body.resp1, req.body.resp2, req.body.resp3, req.body.resp4, req.body.correcta, req.body.tiempo]);
  res.send('hola');
});

//Última pregunta (req = id_cues)
app.post('/ultima/pregunta', (req, res) => {
  console.log('Estoy en /ultima/pregunta: ', req.body)
  var max = preguntas.obtenerUltimaPreguntaInsertada(req.body.id_cues);
  res.send(max);
});

// Esto debe ir al final. Recoge los GET que no sabe redireccionar 
// y se los pasa a react para que los enrute adecuadamente.
app.get('/*', function(req, res) {
  //console.log('Recibido GET desconocido. Delegando enrutamiento a React.')
  res.sendFile(path.join(__dirname, 'Views/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})