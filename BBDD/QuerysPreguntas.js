const DDBB = require('./ConexionBBDD');

// Insertar una pregunta (datos = [id_cues, id_pre, pre, resp, correcta])
let insertarPregunta = function(datos) {

    DDBB.DB().insert('preguntas', {
        id_cues: datos[0],
        id_pre: datos[1],
        pregunta: datos[2],
        respuesta: datos[3],
        correcta: datos[4]
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

// Modificar pregunta (datos = [id_cues, id_pre, pre, resp, correcta])
let modificarPregunta = function(datos) {

    DDBB.DB().update('cuestionarios', {
        pregunta: datos[2],
        respuesta: datos[3],
        correcta: datos[4]
    }, {
        id_cues: datos[0],
        id_pre: datos[1]
    })
}

// Obtener el id de la última pregunta insertada (datos = id_cues)
let obtenerUltimaPreguntaInsertada = function(datos) {
    var a = DDBB.DB().query('SELECT * FROM preguntas WHERE id_cues = ?', datos);
    console.log("soy a: ", a);
}

exports.insertarPregunta = insertarPregunta;
exports.modificarPregunta = modificarPregunta;
exports.eliminarPregunta = eliminarPregunta;
exports.listarPreguntasCuestionario = listarPreguntasCuestionario;
exports.obtenerUltimaPreguntaInsertada = obtenerUltimaPreguntaInsertada;