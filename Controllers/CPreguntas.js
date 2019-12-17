//Función para obtener los datos de las preguntas
async function handleData(id) {
    
    const response = await fetch('/listar/preguntas', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cues: id}),
    });
    
    const body = await response.json();
    return body;
}

//Función que controla la eliminación de una pregunta
async function handleDelete(idC, idP) {

    const response = await fetch('/eliminar/pregunta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cues: idC, id_pre: idP}),
    });

    const body = await response.text();
    return body;
}

//Función que controla la inserción de una nueva pregunta
async function handleInsert() {

    var pregunta = document.getElementById('Nombre').value;
    var respuesta = document.getElementById("Asignatura").value;
    var cor = document.getElementById("Asignatura").value;

    const response = await fetch('/insertar/pregunta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pre: pregunta, resp: respuesta, correcta: cor }),
    });
    
    const body = await response.text();
    return body;
}

//Función que controla la modificación de datos de las preguntas
async function handleModifications(num) {

    for (var i = 0; i < num; i++) {
        
        var id = document.getElementById("id" + i).innerHTML;
        var nombreC = document.getElementById('Nom' + i).value;
        var asignatura = document.getElementById('Asig' + i).value;
        

        const response = await fetch('/modificar/pregunta', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_cues: id, nombre: nombreC, asig: asignatura }),
        });
    }
}

export default {handleData, handleDelete, handleInsert, handleModifications};