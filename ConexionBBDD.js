const sqlite3 = require('sqlite3').verbose();

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

let cerrarBBDD = function() {
  db.close();
}

let obtenerCuestionarios = function() {

  var cuestionarios;

  db.all(`SELECT * FROM cuestionarios WHERE LOWER(nombre_usu) = LOWER("david")`, [], (err,rows) => {
    if (err) {
      throw err;
    }
    cuestionarios = rows; 
  });

  return cuestionarios;
}

exports.obtenerUsuarios = obtenerUsuarios;
exports.cerrarBBDD = cerrarBBDD;
exports.obtenerCuestionarios = obtenerCuestionarios;