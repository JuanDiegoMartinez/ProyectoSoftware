import io from 'socket.io-client';

function controlador() {
    var socket;
    socket.id = "Proyector";
    var socket = io.connect('/');
    
} 

export default controlador;