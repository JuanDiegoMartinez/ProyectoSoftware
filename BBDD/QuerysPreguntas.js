const DDBB = require('./ConexionBBDD');

// Insertar una pregunta (datos = [id_cues, id_pre, pregunta, respuesta, correcta])
let insertarPregunta = function(datos) {

    DDBB.db.serialize(() => {
      DDBB.db.run(`INSERT INTO preguntas VALUES(?,?,?,?,?)`, datos, (err, rows) => {
        if (err) {
          throw err;
        }
        console.log('Pregunta insertada: ', rows);
      });
    });
  }
  
// Obtener las preguntas de un cuestionario (datos = id_cues)
let listarPreguntasCuestionario = function(datos) {

    var cuestionario;

    DDBB.db.serialize(() => {
        DDBB.db.all(`SELECT * FROM preguntas WHERE id_cues = ?`, datos, (err, rows) => {
        if (err) {
            throw err;
        }
        cuestionario = rows;
        console.log('Obtener preguntas: ', cuestionario);
        return rows;
        });
    });
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

// Modificar pregunta (datos = [pregunta, respuesta, correcta, id_cues, id_pre])
let modificarPregunta = function(datos) {

    DDBB.db.serialize(() => {
        DDBB.db.run(`UPDATE preguntas SET pregunta = ?, respuesta = ?, correcta = ? WHERE id_cues = ? AND id_pre = ?`, datos, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Pregunta upgradeada: ', rows);
        });
    });
}

exports.insertarPregunta = insertarPregunta;
exports.modificarPregunta = modificarPregunta;
exports.eliminarPregunta = eliminarPregunta;
exports.listarPreguntasCuestionario = listarPreguntasCuestionario;