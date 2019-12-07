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

app.get('/session', (req,res) => {
  //console.log(req.session.id);
});

const usuarios = require('./BBDD/QuerysUsuarios');

app.get('/api/hello', (req, res) => {
  var a = usuarios.datosUsuario('david');
  console.log('hola ', String(a));
  res.send({ express: 'hola' });
});

// test para leer la respuesta, esto en un futuro hara un acceso a la bbdd y devolvera la respuesta
app.post('/api/readuser', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: User=${req.body.postUser} and Password=${req.body.postPass}`,
  );
  req.session.user = req.body.postUser;
  req.session.pass = req.body.postPass;
  console.log(req.session, req.session.id);
});