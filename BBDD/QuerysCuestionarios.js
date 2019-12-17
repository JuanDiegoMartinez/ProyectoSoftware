const DDBB = require('./ConexionBBDD');

// Insertar un cuestionario (datos = [user, nombre, asig])
let insertarCuestionario = function(datos) {
  
    DDBB.DB().insert('cuestionarios', {
        nombre_usu: datos[0],
        nombre_cues: datos[1],
        asignatura: datos[2]
    })
  }
  
// Borrar el cuestionario y todas las preguntas (datos = id_cues)
let eliminarCuestionario = function(datos) {

    DDBB.db.serialize(() => {
        DDBB.db.run(`DELETE FROM cuestionarios WHERE id_cues = ?`, datos)
        .run(`DELETE FROM preguntas WHERE id_cues = ?`, datos, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Cuestionario borrado: ', rows);
        });
    });
}

// Listar los cuestionarios de un usuario (datos = nombre de usuario)
let listarCuestionarios = function(datos) {
    return DDBB.DB().query('SELECT * FROM cuestionarios WHERE LOWER(nombre_usu) = LOWER(?)', datos);
}

// Modificar un cuestionario de un usuario (datos = [user, id_cues, nombre, asig])
let modificarCuestionario = function(datos) {

    DDBB.DB().update('cuestionarios', {
        nombre_cues: datos[2],
        asignatura: datos[3]
    }, {
        nombre_usu: datos[0],
        id_cues: datos[1] 
    })
}

exports.insertarCuestionario = insertarCuestionario;
exports.eliminarCuestionario = eliminarCuestionario;
exports.listarCuestionarios = listarCuestionarios;
exports.modificarCuestionario = modificarCuestionario;