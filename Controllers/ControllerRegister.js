//Función que controla el registro del usuario
async function handleRegister() {

    var pass = document.getElementById('Password').value;
    var usuario = document.getElementById("Usuario").value;
    var email = document.getElementById("Email").value;

    const response = await fetch('/registro/usuario', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: usuario, pass: pass, email: email }),
    });
    
    const body = await response.text();
    return body;
}

export default handleRegister;