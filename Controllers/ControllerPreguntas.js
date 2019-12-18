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
async function handleInsert(idC, idP) {

    var pregunta = document.getElementById('Pregunta').value;
    var respuesta1 = document.getElementById("Respuesta1").value;
    var respuesta2 = document.getElementById("Respuesta2").value;
    var respuesta3 = document.getElementById("Respuesta3").value;
    var respuesta4 = document.getElementById("Respuesta4").value;
    var cor = document.getElementById("Correcta").value;

    const response = await fetch('/insertar/pregunta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cues: idC, id_pre: idP, pre: pregunta, resp1: respuesta1, resp2: respuesta2, resp3: respuesta3, resp4: respuesta4, correcta: cor }),
    });
    
    const body = await response.text();
    return body;
}

//Función que controla la modificación de datos de las preguntas
async function handleModifications(idC, idP) {

    var pregunta = document.getElementById('Pregunta').value;
    var respuesta1 = document.getElementById("Respuesta1").value;
    var respuesta2 = document.getElementById("Respuesta2").value;
    var respuesta3 = document.getElementById("Respuesta3").value;
    var respuesta4 = document.getElementById("Respuesta4").value;
    var cor = document.getElementById("Correcta").value;
    

    const response = await fetch('/modificar/pregunta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cues: idC, id_pre: idP, pre: pregunta, resp1: respuesta1, resp2: respuesta2, resp3: respuesta3, resp4: respuesta4, correcta: cor }),
    });
    
}

async function handleUltimaPregunta(id) {
    
    const response = await fetch('/ultima/pregunta', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cues: id}),
    });
    
    const body = await response.json();
    return body;
}

export default {handleData, handleDelete, handleInsert, handleModifications, handleUltimaPregunta};