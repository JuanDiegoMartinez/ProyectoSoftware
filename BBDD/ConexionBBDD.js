const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos
let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

// Cerrar la base de datos
let cerrarBBDD = function() {
  db.close();
}

exports.db = db;