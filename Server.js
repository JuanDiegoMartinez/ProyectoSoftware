const express = require('express');
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

server.listen(4000) {
    console.log('server on port 4000');
});
