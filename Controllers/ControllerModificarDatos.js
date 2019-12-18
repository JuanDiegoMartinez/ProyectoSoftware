//Función para obtener los datos del usuario
async function handleData() {
    
    const response = await fetch('/datos/usuario', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    });
    
    const body = await response.json();
    return body;
}

//Función que controla la modificación de datos del usuario
async function handleModifications() {

    var password1 = document.getElementById('Password1').value;
    var password2 = document.getElementById('Password2').value;
    var email = document.getElementById("Email").value;

    if (password1 === password2) {
        
        const response = await fetch('/modificar/usuario', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pass: password1, email: email }),
        });

        const body = await response.text();
        return body;
    }
    
    return false;
}

export default {handleData, handleModifications};