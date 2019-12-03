import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    pasar() {
        
        var u = document.getElementById("Usuario").value;
        var p = document.getElementById("Password").value;

        console.log(u);
        console.log(p);
    }

    render() {
        return(
            <React.Fragment>
                
                <h1 align="center"> Kahoot </h1>
  
                <form align="center">
                    <p> Usuario: <input id="Usuario" type="text" /> </p>
                    <p> Contraseña: <input id="Password" type="password" /> </p>
                    <p> <Link to="/Register"> ¿Aún no tienes una cuenta? </Link> </p>
                    <p> <button name="Enviar" type="button" onClick={() => this.pasar()}> Enviar </button> </p>
                </form>

                <p align="center"> <Link to="/Alumno/Sala"> Elegir sala </Link> </p>
                <p align="center"> <Link to="/Profesor/Cuestionarios"> Gestionar cuestionarios </Link> </p>

            </React.Fragment>
        );
    }
}

export default Login;