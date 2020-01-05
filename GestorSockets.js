// Define el comportamiento que tendrá el servidor al recibir mensajes mediante sockets
// Las funciones se definen como funciones anónimas dentro de io.on para poder acceder al objeto "socket"
let definirInteracciones = function(io) {
    // Datos sobre las sesiones
    var mapaPuntos = new Map(); 
    var mapaCorrectas = new Map();
    var mapaSegundos = new Map();
    var mapaRespondidas = new Map();

    // Conexiones de los sockets
    io.on('connection', socket => {
        console.log('Conectado socket:', socket.id);

        // Cuando un profesor envia una pregunta
        // Emitir pregunta a los alumnos y proyectores de la misma sala
        socket.on('enviarPregunta', function(pregunta) {
            var sala = Object.keys(io.sockets.adapter.sids[socket.id])[0]

            // Enviar la pregunta solo si no hay otra en curso
            if(mapaSegundos.get(sala) == null) {
                mapaCorrectas.set(sala, pregunta.correcta)
                socket.broadcast.to(sala).emit('preguntaEnviada', pregunta);

                mapaRespondidas.get(sala).push(pregunta.id)
                socket.emit('pregEnviadas', mapaRespondidas.get(sala))

                // Contar los segundos restantes (para que no dependa de ningún usuario)
                mapaSegundos.set(sala, pregunta.timer)
                let k = setInterval(function() {
                    mapaSegundos.set(sala, mapaSegundos.get(sala)-1)
                    socket.broadcast.to(sala).emit('segundosRestantes', mapaSegundos.get(sala))
                    if (mapaSegundos.get(sala) <= 0) {
                    mapaSegundos.set(sala, null)
                    clearInterval(k);
                    }
                }, 1000);

                console.log('Estoy en enviarPregunta:', pregunta);
                console.log('Enviada pregunta a sala', sala)
            } else {
                socket.emit('errorPregunta', 0)
                console.log('Ya hay una pregunta en curso en la sala', sala);
            }
        });

        // Cuando un alumno responde
        // Emitir respuesta a los proyectores de la misma sala
        socket.on('enviarRespuesta', function(respuesta) {
            var sala = Object.keys(io.sockets.adapter.sids[socket.id])[0];
            var puntos = mapaPuntos.get(sala).get(respuesta.nombre);

            if(mapaCorrectas.get(sala) == respuesta.resp) puntos += mapaSegundos.get(sala); 
            else puntos -= mapaSegundos.get(sala);

            mapaPuntos.get(sala).set(respuesta.nombre, puntos)
            socket.broadcast.to(sala).emit('respuestaEnviada', {nombre: respuesta.nombre, puntos: puntos, resp: respuesta.resp});
            socket.emit('nuevosPuntos', puntos)
            console.log('Estoy en enviarRespuesta:', respuesta);
            console.log('Enviada respuesta a sala', sala);
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

                // Si el nuevo usuario no es un proyector, comunicar su llegada (solo los proyectores tienen un int como nombre)
                if(!(datos.nombre == datos.sala)) {
                    socket.broadcast.to(datos.sala).emit('nuevoAlumnoEnSala', datos.nombre)
                    mapaPuntos.get(datos.sala).set(datos.nombre, 0)
                }
                }

                // Entrar en la sala
                socket.join(datos.sala)
            } else {
                socket.emit('errorSala', 0)
                console.log('La sala a la que se ha intentado acceder no existe:', datos.sala);
            }
            });

            // Cuando un alumno intenta entrar a una sala
            // Responder según si existe o no dicha sala
            socket.on('comprobarSala', function(sala) {
            if(mapaPuntos.has(sala)) {
                console.log("La sala", sala, "existe")
                socket.emit('salaExiste', 1)
            } else {
                console.log("La sala", sala, "no existe")
                socket.emit('salaExiste', 0)
            }
        })

        // Cuando un profesor abre un cuestionario
        // Crear una nueva sala con el id del cuestionario y entrar en ella
        socket.on('nuevaSesion', function(sala) {
            // Salir de todas las salas anteriores (si las hay)
            var salasUsuario = io.sockets.adapter.sids[socket.id]; 
            for(var s in salasUsuario) { socket.leave(s); }

            // Crear datos de la sala si no existe
            if(mapaPuntos.get(sala) == null) {
                mapaPuntos.set(sala, new Map())
                mapaSegundos.set(sala, null)
                mapaRespondidas.set(sala, Array())
                console.log('Abierta sala', sala)

            // Enviar datos de la sala si ya existe (el profesor ha actualizado la página)
            } else {
                socket.emit('pregEnviadas', mapaRespondidas.get(sala))
            }

            // Entrar en la sala
            socket.join(sala)
        })

        // Cuando termina una sesión
        // Eliminar todos los datos de la sesión (si no hay una pregunta en curso) y notificar a la sala
        socket.on('terminarSesion', function(sala) {
            if(mapaSegundos.get(sala) == null) {
                socket.broadcast.to(sala).emit('sesionTerminada', 0)
                socket.emit('sesionTerminada', 0)
                mapaPuntos.delete(sala)
                mapaCorrectas.delete(sala)
                mapaSegundos.delete(sala)
                mapaRespondidas.delete(sala)
            } else {
                socket.emit('errorPregunta', 1)
            }
        })

        // Cuando un socket se desconecta
        socket.on('disconnect', function() {
            console.log('Desconectado socket:', socket.id);
        });
    });
}

exports.definirInteracciones = definirInteracciones;