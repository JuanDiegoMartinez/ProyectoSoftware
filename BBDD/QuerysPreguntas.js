const DDBB = require('./ConexionBBDD');

// Insertar una pregunta (datos = [id_cues, id_pre, pre, resp1, resp2, resp3, resp4, correcta])
let insertarPregunta = function(datos) {

    DDBB.DB().insert('preguntas', {
        id_cues: datos[0],
        id_pre: datos[1],
        pregunta: datos[2],
        respuesta1: datos[3],
        respuesta2: datos[4],
        respuesta3: datos[5],
        respuesta4: datos[6],
        correcta: datos[7]
    })
}
  
// Obtener las preguntas de un cuestionario (datos = id_cues)
let listarPreguntasCuestionario = function(datos) {
    console.log(datos);
    return DDBB.DB().query('SELECT * FROM preguntas WHERE id_cues = ?', datos);
}

// Borrar una pregunta (datos = [id_cues, id_pre])
let eliminarPregunta = function(datos) {

    DDBB.db.serialize(() => {
        DDBB.db.run(`DELETE FROM preguntas WHERE id_cues = ? AND id_pre = ?`, datos, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Pregunta borrada: ', rows);
        });
    });
}

// Modificar pregunta (datos = [id_cues, id_pre, pre, resp1, resp2, resp3, resp4, correcta])
let modificarPregunta = function(datos) {

    DDBB.DB().update('preguntas', {
        pregunta: datos[2],
        respuesta1: datos[3],
        respuesta2: datos[4],
        respuesta3: datos[5],
        respuesta4: datos[6],
        correcta: datos[7]
    }, {
        id_cues: datos[0],
        id_pre: datos[1]
    })
}

// Obtener el id de la última pregunta insertada (datos = id_cues)
let obtenerUltimaPreguntaInsertada = function(datos) {
    return DDBB.DB().queryFirstRow('SELECT MAX(id_pre) as "max" FROM preguntas WHERE id_cues = ?', datos);
    
}

exports.insertarPregunta = insertarPregunta;
exports.modificarPregunta = modificarPregunta;
exports.eliminarPregunta = eliminarPregunta;
exports.listarPreguntasCuestionario = listarPreguntasCuestionario;
exports.obtenerUltimaPreguntaInsertada = obtenerUltimaPreguntaInsertada;