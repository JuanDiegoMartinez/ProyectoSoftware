//Función para obtener los cuestionarios del usuario
async function handleData() {
    
    const response = await fetch('/listar/cuestionarios', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    });
    
    const body = await response.json();
    return body;
}

//Función que controla la eliminación de un cuestionario
async function handleDelete(id) {

    const response = await fetch('/eliminar/cuestionario', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cues: id}),
    });

    const body = await response.text();
    return body;
}

//Función que controla la inserción de un nuevo cuestionario
async function handleInsert() {

    var nombreC = document.getElementById('Nombre').value;
    var asignatura = document.getElementById("Asignatura").value;

    const response = await fetch('/insertar/cuestionario', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombreC, asig: asignatura }),
    });
    
    const body = await response.text();
    return body;
}

//Función que controla la modificación de datos de los cuestionarios
async function handleModifications(num) {

    for (var i = 0; i < num; i++) {
        
        var id = document.getElementById("id" + i).innerHTML;
        var nombreC = document.getElementById('Nom' + i).value;
        var asignatura = document.getElementById('Asig' + i).value;
        

        const response = await fetch('/modificar/usuario', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_cues: id, nombre: nombreC, asig: asignatura }),
        });
    }
}

export default {handleData, handleDelete, handleInsert, handleModifications};