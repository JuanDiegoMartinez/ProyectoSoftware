const DDBB = require('./ConexionBBDD');

// Insertar un usuario (datos = [nombre, password, email])
let insertarUsuario = function(datos) {

    DDBB.db.serialize(() => {
        DDBB.db.run(`INSERT INTO usuarios VALUES(?,?,?)`, datos, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log('Usuario insertado');
        });
    });
}

// Modificar un usuario (datos = [password, email, nombre])
let modificarUsuario = function(datos) {

    DDBB.db.serialize(() => {
        DDBB.db.run(`UPDATE usuarios SET password = ?, email = ? WHERE nombre = ?`, datos, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log('Usuario ', datos[2], ' modificado');
        });
    });
}

// TODO: este todavía no está terminado
// Eliminar un usuario (datos = nombre usuario)
let eliminarUsuario = function(datos) {

    DDBB.db.serialize(() => {
        DDBB.db.run(`DELETE FROM usuarios WHERE nombre = ?`, datos)
        .run(`DELETE FROM cuestionarios WHERE nombre_usu = ?`, datos)
        .run(`DELETE FROM preguntas WHERE id_cues = ?`, [], (err, rows) => {
          if (err) {
            throw err;
          }
          console.log('Cuestionario borrado: ', rows);
        });
      });
}

// Obtener los datos de un usuario (datos = nombre del usuario)
let datosUsuario = function(datos) {

    var datosUsu;;

    DDBB.db.serialize(() => {
        DDBB.db.get(`SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(?)`, datos, (err, rows) => {
            if (err) {
                throw err;
            }
            datosUsu = rows;
            console.log(rows);
            console.log(datosUsu);
            console.log(datosUsu.nombre);
            return rows;
        });
    });

    //return datosUsu;
}

exports.insertarUsuario = insertarUsuario;
exports.modificarUsuario = modificarUsuario;
exports.datosUsuario = datosUsuario;