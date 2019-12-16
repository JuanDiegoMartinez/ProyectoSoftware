const DDBB = require('./ConexionBBDD');

// Insertar una pregunta (datos = [id_cues, id_pre, pre, resp, correcta])
let insertarPregunta = function(datos) {

    DDBB.DB().insert('preguntas', {
        id_cues: datos.id_cues,
        id_pre: datos.id_pre,
        pregunta: datos.pre,
        respuesta: datos.resp,
        correcta: datos.correcta
    })
}
  
// Obtener las preguntas de un cuestionario (datos = id_cues)
let listarPreguntasCuestionario = function(datos) {
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
        pregunta: datos.pre,
        respuesta: datos.resp,
        correcta: datos.correcta
    }, {
        id_cues: datos.id_cues,
        id_pre: datos.id_pre
    })
}

exports.insertarPregunta = insertarPregunta;
exports.modificarPregunta = modificarPregunta;
exports.eliminarPregunta = eliminarPregunta;
exports.listarPreguntasCuestionario = listarPreguntasCuestionario;