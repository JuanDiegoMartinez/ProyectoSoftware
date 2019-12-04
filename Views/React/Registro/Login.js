import React from 'react';
import { Link } from 'react-router-dom';
import '../Global.css';
import login from '../../../Controllers/Clogin';

class Login extends React.Component {

    render() {
        return(
            <React.Fragment>
                
                <h1 align="center"> Kahoot </h1>
  
                <form align="center">
                    <p> Usuario: <input id="Usuario" type="text" /> </p>
                    <p> Contraseña: <input id="Password" type="password" /> </p>
                    <p> <button name="Enviar" type="submit" onClick={ () => login()}> Enviar </button> </p>
                </form>

                <p> <Link to="/Register"> ¿Aún no tienes una cuenta? </Link> </p>
                <p align="center"> <Link to="/Alumno/Sala"> Elegir sala </Link> </p>
                <p align="center"> <Link to="/Profesor/Cuestionarios"> Gestionar cuestionarios </Link> </p>

            </React.Fragment>
        );
    }
}

export default Login;