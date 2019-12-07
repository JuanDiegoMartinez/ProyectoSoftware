const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos
let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

let obtenerUsuarios = function() {
  db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.id_user, row.nombre);
    });
  });
}

// Cerrar la base de datos
let cerrarBBDD = function() {
  db.close();
}

// Insertar un cuestionario datos = [nombre_usu, id_cues, nombre_cues, asignatura]
let insertarCuestionario = function(datos) {
  
  db.serialize(() => {
    db.run(`INSERT INTO cuestionarios VALUES(?,?,?,?)`, datos, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('Cuestionario insertado: ', rows);
    });
  });
}

// Borrar el cuestionario (datos tiene id_cues)
let eliminarCuestionario = function(datos) {

  db.serialize(() => {
    db.run(`DELETE FROM cuestionarios WHERE id_cues = ?`, datos)
    .run(`DELETE FROM preguntas WHERE id_cues = ?`, datos, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('Cuestionario borrado: ', rows);
    });
  });
}

// Obtener los cuestionarios de un usuario (usuario es el nombre de usuario)
let obtenerCuestionarios = function(usuario) {

  var cuestionarios;

  db.serialize(() => {
    db.all(`SELECT * FROM cuestionarios WHERE LOWER(nombre_usu) = LOWER(?)`, usuario, (err,rows) => {
      if (err) {
        throw err;
      }
      cuestionarios = rows;
      console.log('Obtener cuestionarios: ', cuestionarios); 
    });
  });

  return cuestionarios;
}

// Insertar la pregunta (datos es una array que tiene la pregunta) datos = [id_cues, id_pre, pregunta, respuesta, correcta]
let insertarPregunta = function(datos) {

  db.serialize(() => {
    db.run(`INSERT INTO preguntas VALUES(?,?,?,?,?)`, datos, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('Pregunta insertada: ', rows);
    });
  });
}

// Obtener las preguntas del id del cuestionario que recibe en id (id es un integer)
let obtenerPreguntas = function(id) {

  var cuestionario;

  db.serialize(() => {
    db.all(`SELECT * FROM preguntas WHERE id_cues = ?`, id, (err, rows) => {
      if (err) {
        throw err;
      }
      cuestionario = rows;
      console.log('Obtener preguntas: ', cuestionario);
    });
  });

  return cuestionario;
}

// Borrar la pregunta (datos es una array que tiene id_cues y id_pre)
let eliminarPregunta = function(datos) {

  db.serialize(() => {
    db.run(`DELETE FROM preguntas WHERE id_cues = ? AND id_pre = ?`, datos, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('Pregunta borrada: ', rows);
    });
  });
}

// Update de la pregunta (datos es una array que tiene los datos de la pregunta) datos = [pregunta, respuesta, correcta, id_cues, id_pre]
let updatePregunta = function(datos) {

  db.serialize(() => {
    db.run(`UPDATE preguntas SET pregunta = ?, respuesta = ?, correcta = ? WHERE id_cues = ? AND id_pre = ?`, datos, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('Pregunta upgradeada: ', rows);
    });
  });
}

exports.obtenerUsuarios = obtenerUsuarios;
exports.cerrarBBDD = cerrarBBDD;
exports.obtenerCuestionarios = obtenerCuestionarios;
exports.insertarPregunta = insertarPregunta;
exports.obtenerPreguntas = obtenerPreguntas;
exports.eliminarPregunta = eliminarPregunta;
exports.updatePregunta = updatePregunta;
exports.insertarCuestionario = insertarCuestionario;
exports.eliminarCuestionario = eliminarCuestionario;