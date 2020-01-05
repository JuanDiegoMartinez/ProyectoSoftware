const path = require('path');
const cuestionarios = require('./BBDD/QueriesCuestionarios'); // BBDD de la parte de los cuestionarios
const preguntas = require('./BBDD/QueriesPreguntas'); // BBDD de la parte de las preguntas
const usuarios = require('./BBDD/QueriesUsuarios'); // BBDD de la parte de los usuarios

let definirInteracciones = function(app) {
    
    // Login usuario (req = user, pass)
    app.post('/login/usuario', function(req, res) {
        console.log('Estoy en /login/usuario: ', req.body);
        var login = usuarios.loginUsuario([req.body.user, req.body.pass]);

        if (login) {
            req.session.user = req.body.user;
            console.log('Estoy en /login/usuario: ', req.session);
            console.log('Estoy en /login/usuario: ', req.session.user);
        }
        res.send(login);
    });

    // Registro del usuario (req = user, pass, email)
    app.post('/registro/usuario', (req, res) => {
        console.log('Estoy en /registro/usuario: ', req.body)
        var insertado = usuarios.insertarUsuario([req.body.user, req.body.pass, req.body.email]);
        res.send(insertado);
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
            res.send('Debes estar registrado');
        }
        else {
            var datos = usuarios.datosUsuario(req.session.user);
            res.send(datos);
        }
    });

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
        res.send(cues);
    });

    //Modificar cuestionario (req = user, id_cues, nombre, asig)
    app.post('/modificar/cuestionario', (req, res) => {
        console.log('Estoy en /modificar/cuestionario: ', req.body);
        cuestionarios.modificarCuestionario([req.session.user, req.body.id_cues, req.body.nombre, req.body.asig]);
        res.send('Cuestionario modificado');
    });

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
        res.sendFile(path.join(__dirname, 'Views/index.html'), function(err) {
            if (err) {
            res.status(500).send(err)
            }
        })
    })
}

exports.definirInteracciones = definirInteracciones