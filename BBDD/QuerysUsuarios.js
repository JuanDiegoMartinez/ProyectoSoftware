const DDBB = require('./ConexionBBDD');

// Insertar un usuario (datos = [user, pass, email])
let insertarUsuario = function(datos) {

    DDBB.DB().insert('usuarios', {
        nombre: datos[0],
        password: datos[1],
        email: datos[2]
    })
}

// Modificar un usuario (datos = [user, pass, email])
let modificarUsuario = function(datos) {
    
    DDBB.DB().update('usuarios', {
        password: datos[1],
        email: datos[2]
    }, {
        nombre: datos[0] 
    })
}

// TODO: este todavía no está terminado
// Eliminar un usuario (datos = nombre usuario)
let eliminarUsuario = function(datos) {

}

// Obtener los datos de un usuario (datos = user)
let datosUsuario = function(datos) {
    return DDBB.DB().queryFirstRow('SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(?)', datos);
}

// Para hacer login (datos = [user, pass])
let loginUsuario = function(datos) {

    let esta = DDBB.DB().queryFirstRow('SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(?) AND password = ?', datos[0], datos[1]);

    if ( esta === undefined) {
        return false;
    }
    return true;
}

exports.insertarUsuario = insertarUsuario;
exports.modificarUsuario = modificarUsuario;
exports.datosUsuario = datosUsuario;
exports.loginUsuario = loginUsuario;