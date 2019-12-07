const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conexión a la base de datos
let db = new sqlite3.Database(path.join(__dirname, 'database.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

exports.db = db;