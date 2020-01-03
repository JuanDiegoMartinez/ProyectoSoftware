const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB = require('better-sqlite3-helper');

// Conexión a la base de datos
let db = new sqlite3.Database(path.join(__dirname, 'database.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado a la base de datos.');
});

DB({
  path: path.join(__dirname, 'database.db'),
  memory: false,
  readonly: false,
  fileMustExist: false,
  migrate: false
})

// Al utilizar exports y después cargar con require, solamente una instancia de cada
// objeto será utilizada por las clases que realizan las queries (singleton).
exports.db = db;
exports.DB = DB;