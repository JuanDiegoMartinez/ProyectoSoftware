const DDBB = require('./ConexionBBDD');

// Insertar un cuestionario (datos = [nombre_usu, id_cues, nombre_cues, asignatura])
let insertarCuestionario = function(datos) {
  
    DDBB.db.serialize(() => {
      DDBB.db.run(`INSERT INTO cuestionarios VALUES(?,?,?,?)`, datos, (err, rows) => {
        if (err) {
          throw err;
        }
        console.log('Cuestionario insertado: ', rows);
      });
    });
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

    var cuestionarios;

    DDBB.db.serialize(() => {
        DDBB.db.all(`SELECT * FROM cuestionarios WHERE LOWER(nombre_usu) = LOWER(?)`, datos, (err,rows) => {
        if (err) {
            throw err;
        }
        cuestionarios = rows;
        console.log('Listar cuestionarios: ', cuestionarios); 
        });
    });

    return cuestionarios;
}

// Modificar un cuestionario de un usuario (datos = [nombre_cues, asignatura, nombre_usu, id_cues])
let modificarCuestionario = function(datos) {

    DDBB.db.serialize(() => {
        DDBB.db.run(`UPDATE cuestionarios SET nombre_cues = ?, asignatura = ? WHERE nombre_usu = ? AND id_cues = ?`, datos, (err,rows) => {
        if (err) {
            throw err;
        }
        console.log('Modificar cuestionario: '); 
        });
    });
}

exports.insertarCuestionario = insertarCuestionario;
exports.eliminarCuestionario = eliminarCuestionario;
exports.listarCuestionarios = listarCuestionarios;
exports.modificarCuestionario = modificarCuestionario;