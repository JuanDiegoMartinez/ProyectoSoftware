//Función que controla el login del usuario
async function handleLogin() {

    var pass = document.getElementById('Password').value;
    var usuario = document.getElementById("Usuario").value;

    const response = await fetch('/api/readuser', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postUser: usuario, postPass: pass }),
    });
    const body = await response.text();
    return body;
}

export default handleLogin;