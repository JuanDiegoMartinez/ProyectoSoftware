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
    //DDBB.DB().update('usuarios', datos, []
}

// TODO: este todavía no está terminado
// Eliminar un usuario (datos = nombre usuario)
let eliminarUsuario = function(datos) {

}

// Obtener los datos de un usuario (datos = nombre del usuario)
let datosUsuario = function(datos) {
    return DDBB.DB().queryFirstRow('SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(?)', datos);
}

// Para hacer login (datos = [nombre, password])
let loginUsuario = function(datos) {
    let esta = DDBB.DB().queryFirstRow('SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(?) AND password = ?', datos.user, datos.pass);

    console.log(esta);
    if ( esta === undefined) {
        return false;
    }
    return true;
}

exports.insertarUsuario = insertarUsuario;
exports.modificarUsuario = modificarUsuario;
exports.datosUsuario = datosUsuario;
exports.loginUsuario = loginUsuario;