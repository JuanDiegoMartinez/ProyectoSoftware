//Función que controla el login del usuario
async function handleLogin() {

    var password = document.getElementById('Password').value;
    var usuario = document.getElementById("Usuario").value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: usuario, pass: password }),
    });
    
    const body = await response.text();
    return body;
}

export default handleLogin;