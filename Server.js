//import db from './ConexionBBDD.js';
const db = require('./ConexionBBDD')
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// middleware
app.use(webpackDevMiddleware(webpack(config)));

app.use(express.static(path.join(__dirname, 'Views')));

io.on('connection', socket => {
    console.log('socket connected: ', socket.id);
});

server.listen(4000, () => {
    console.log('server on port 4000');

    let sql = `SELECT id_user id, nombre nom FROM usuarios`;
});

process.on('exit', db.cerrarBBDD);

db.obtenerUsuarios();

// conectar con api para comunicar con react
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'GET test successful. Submit to verify the POST test.' });
});

// test para leer la respuesta, esto en un futuro hara un acceso a la bbdd y devolvera la respuesta
app.post('/api/readuser', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: User=${req.body.postUser} and Password=${req.body.postPass}`,
  );
});

//const port = process.env.PORT || 5000;
//app.listen(port, () => console.log(`Listening on port ${port}`));