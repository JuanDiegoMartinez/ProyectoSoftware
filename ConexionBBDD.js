const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

let sql = `SELECT id iden, texto a FROM tabla`;

let insert = `insert into tabla values(80,'djdj')`;
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.iden, row.a);
  });
});

  // insert one row into the langs table
  db.run(insert, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted`);
  });

db.close();

export default db;