const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

let insert = `insert into tabla values(80,'djdj')`;

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

// insert one row into the langs table
/*
db.run(insert, [], function(err) {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log(`A row has been inserted`);
});
*/

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