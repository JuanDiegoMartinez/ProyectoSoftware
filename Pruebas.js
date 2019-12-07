const db = require('./ConexionBBDD');

// Prueba insertar cuestionario
var datos = ['david', 1, 'hola', 'diseño'];
db.insertarCuestionario(datos);

// Prueba obtener cuestionario
//usuario = 'david';
//db.obtenerCuestionarios(usuario);

// Prueba insertar pregunta
datos = [1,1,'hehehe', 'kadsfjs', 2];
db.insertarPregunta(datos);

datos = [1,2,'hahaha', 'kdfs', 3];
db.insertarPregunta(datos);

// Prueba borrar cuestionario
datos = 1;
db.eliminarCuestionario(datos);

/*
// Prueba obtener preguntas
db.obtenerPreguntas(1);

// Prueba eliminar pregunta
datos = [1,1];
db.eliminarPregunta(datos);

// Prueba modificar pregunta
datos = ['adios', 'lala', 2, 1, 2];
db.updatePregunta(datos);
*/