const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB = require('better-sqlite3-helper');

// Conexión a la base de datos
let db = new sqlite3.Database(path.join(__dirname, 'database.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

DB({
  path: path.join(__dirname, 'database.db'), // this is the default
  memory: false, // create a db only in memory
  readonly: false, // read only
  fileMustExist: false, // throw error if database not exists
  migrate: false
})

exports.db = db;
exports.DB = DB;